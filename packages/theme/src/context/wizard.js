import React from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";
import {
  useController,
  useForm as useReactHookForm,
  useWatch,
} from "react-hook-form";

import { bracketSlashes, removeSlashes, isClientSide } from "../utils/helpers";
import {
  clearStorage,
  getStorage,
  setStorage,
  getLocalStorage,
  setLocalStorage,
} from "../utils/storage";

const FORM_STORAGE_KEY = "COMMONWEALTH_SAVINGS_WIZARD_DEMO_STATE";
const VALIDATION_STORAGE_KEY = "COMMONWEALTH_SAVINGS_WIZARD_DEMO_VALIDATION";
const DISCLOSURE_KEY = "COMMONWEALTH_SAVINGS_WIZARD_DEMO_DISCLOSURE";

let buildHash;

function persistFormValues(data) {
  setStorage(FORM_STORAGE_KEY + buildHash, data);
}

function retrieveFormValues() {
  return getStorage(FORM_STORAGE_KEY + buildHash);
}

function clearFormValues() {
  clearStorage(FORM_STORAGE_KEY + buildHash);
}

const stepKeys = [];

function getInitialState(steps) {
  return {
    formValues: {},
    wizardState: {
      isCompleted: false,
      step: steps.map(({ slug, index }) => ({
        slug,
        index,
        isCompleted: false,
      })),
    },
  };
}

function getInitialValidationIntent() {
  const bool = getLocalStorage(VALIDATION_STORAGE_KEY);
  if (typeof bool === "boolean") {
    return bool;
  }

  return true;
}

const WizardContext = React.createContext();

const WizardContextProvider = ({ children, routes }) => {
  const { allWizardStep, site } = useStaticQuery(graphql`
    query {
      site {
        internal {
          contentDigest
        }
      }
      allWizardStep {
        edges {
          node {
            slug
            cta
            nextText
            backText
            index
          }
        }
      }
    }
  `);

  if (!buildHash) {
    buildHash = site.internal.contentDigest;
  }

  const disclosure = React.useState(getStorage(DISCLOSURE_KEY));

  const steps = React.useMemo(() => {
    return allWizardStep.edges
      .filter(({ node }) => !isNaN(node.index))
      .map(({ node }) => node)
      .sort((a, b) => a.index - b.index);
  }, [allWizardStep]);

  React.useEffect(() => {
    if (isClientSide()) {
      for (const step of steps) {
        stepKeys.push(step.slug);
      }
    }
  }, [steps]);

  const location = useLocation();

  const active = React.useMemo(() => {
    return steps.find(o => o.slug === location.pathname) || {};
  }, [steps, location]);

  const form = useReactHookForm({ mode: "onBlur" });

  const [{ formValues, wizardState }, dispatch] = React.useReducer(
    reducer,
    retrieveFormValues() || getInitialState(steps)
  );

  const [globalValidation, setGlobalValidation] = React.useState(
    getInitialValidationIntent()
  );

  return (
    <WizardContext.Provider
      value={{
        active,
        dispatch,
        form,
        formValues,
        steps,
        wizardState,
        globalValidation,
        setGlobalValidation,
        disclosure,
        routes,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

function reducer(state, [type, payload]) {
  switch (type) {
    case "FORM_VALUES_UPDATED": {
      const next = {
        ...state,
        formValues: {
          ...state.formValues,
          ...payload,
        },
      };
      persistFormValues(next);
      return next;
    }

    case "WIZARD_RESET": {
      clearFormValues();
      return getInitialState(payload.steps);
    }

    case "STEP_COMPLETED": {
      let completed = true;
      const wizardState = {
        ...state.wizardState,
        step: state.wizardState.step.map(step => {
          if (step.slug === payload.slug || step.index === payload.index) {
            return { ...step, isCompleted: true };
          }

          if (!step.isCompleted) {
            completed = false;
          }

          return step;
        }),
      };
      wizardState.isCompleted = completed;
      return { ...state, wizardState };
    }
    default: {
      return state;
    }
  }
}

function useSteps() {
  const { active, steps, wizardState } = React.useContext(WizardContext);
  const index = active?.index || 0;
  const first = steps[0];
  const last = steps[steps.length - 1];
  const previous = steps[index - 1] || null;
  const next = steps[index + 1] || null;
  const current =
    !wizardState.isCompleted &&
    steps[wizardState.step.find(o => !o.isCompleted).index];

  return {
    active,
    current: current || {},
    first,
    last,
    next,
    previous,
    steps,
  };
}

function useFormField({ name, rules, defaultValue }) {
  if (!name) {
    throw new Error("useFormField hook requires a name argument");
  }

  const {
    form: { control, unregister },
  } = React.useContext(WizardContext);

  const {
    field: { ref, ...fieldProps },
    fieldState: { error },
  } = useController({ control, defaultValue, name, rules });

  return {
    error,
    fieldProps,
    ref,
    unregister,
  };
}

function useFormValues(name) {
  const { formValues } = React.useContext(WizardContext);
  if (typeof name === "string") {
    return formValues[name];
  }

  if (Array.isArray(name) && name.length > 0) {
    const data = name.reduce((o, name) => {
      return { ...o, [name]: formValues[name] };
    }, {});
    return data;
  }

  return formValues;
}

function useFormSubmit() {
  const {
    active,
    steps,
    dispatch,
    routes: { confirmation },
    form: { handleSubmit },
  } = React.useContext(WizardContext);

  const handleFormSubmit = React.useCallback(
    handleSubmit(data => {
      dispatch(["FORM_VALUES_UPDATED", data]);
      dispatch(["STEP_COMPLETED", active]);
      let next = confirmation;
      if (active.index + 1 < steps.length) {
        next = bracketSlashes(steps[active.index + 1].slug);
      }

      navigate(next, { state: { scroll: true } });
    }),
    [active, steps, handleSubmit, dispatch]
  );

  return handleFormSubmit;
}

function useSaveFormValues() {
  const {
    dispatch,
    form: { getValues },
  } = React.useContext(WizardContext);
  const saveFormData = React.useCallback(() => {
    dispatch(["FORM_VALUES_UPDATED", getValues()]);
  }, [getValues, dispatch]);
  return saveFormData;
}

function useResetWizard() {
  const {
    steps,
    dispatch,
    disclosure: [, setDisclosure],
    form: { reset },
  } = React.useContext(WizardContext);
  return {
    reset() {
      dispatch(["WIZARD_RESET", { steps }]);
      reset();
    },
    restart() {
      dispatch(["WIZARD_RESET", { steps }]);
      reset();
      setDisclosure(false);
      setStorage(DISCLOSURE_KEY, false);
    },
  };
}

function useLiveFormValues(name, defaults) {
  const { form, formValues } = React.useContext(WizardContext);
  let defaultValue = formValues;
  if (Array.isArray(name)) {
    defaultValue = [];
    for (let i = 0; i < name.length; i++) {
      let d = formValues[name[i]];
      if (!d && Array.isArray(defaults)) {
        d = defaults[i];
      }
      defaultValue.push(d);
    }
  } else {
    if (name) {
      defaultValue = formValues[name] || defaults;
    }
  }

  return useWatch({
    control: form.control,
    name,
    defaultValue,
  });
}

function useSetFormValue() {
  const { form } = React.useContext(WizardContext);
  return form.setValue;
}

function useIsCompleted() {
  const { wizardState } = React.useContext(WizardContext);
  const isCompleted = step => {
    if (step) {
      let { isCompleted } =
        wizardState.step.find(
          o => step.slug === o.slug || step.index === o.index
        ) || {};
      return isCompleted;
    }
    return wizardState.isCompleted;
  };
  return isCompleted;
}

function isStepRoute({ location }) {
  if (!isClientSide()) {
    return;
  }

  const pathSlug = removeSlashes(location.pathname).split("/").pop();

  for (let slug of stepKeys) {
    if (slug === pathSlug) {
      return true;
    }
  }

  return false;
}

function useFormValidationRules() {
  const { globalValidation } = React.useContext(WizardContext);

  return ({ required, rules }) => {
    if (!globalValidation) {
      return {};
    }

    return {
      ...(required ? { required: "Please fill out the field above" } : {}),
      ...(rules || {}),
    };
  };
}

function useToggleGlobalValidation() {
  const { form, globalValidation, setGlobalValidation } =
    React.useContext(WizardContext);

  return {
    globalValidation,
    toggleGlobalValidation: bool => {
      if (bool === true) {
        setGlobalValidation(true);
        setLocalStorage(VALIDATION_STORAGE_KEY, true);
      } else if (bool === false) {
        setGlobalValidation(false);
        form.clearErrors();
        setLocalStorage(VALIDATION_STORAGE_KEY, false);
      } else {
        setGlobalValidation(s => {
          if (s) {
            form.clearErrors();
          }
          setLocalStorage(VALIDATION_STORAGE_KEY, !s);
          return !s;
        });
      }
    },
  };
}

function useDisclosure() {
  const {
    disclosure: [isDismissed, setState],
  } = React.useContext(WizardContext);

  const dismiss = () => {
    setState(true);
    setStorage(DISCLOSURE_KEY, true);
  };

  const reset = () => {
    setState(false);
    setStorage(DISCLOSURE_KEY, false);
  };

  return {
    isDismissed,
    dismiss,
    reset,
  };
}

function useForm() {
  const { form } = React.useContext(WizardContext);
  return form;
}

export {
  WizardContextProvider,
  isStepRoute,
  useDisclosure,
  useForm,
  useFormField,
  useFormSubmit,
  useFormValues,
  useIsCompleted,
  useResetWizard,
  useSaveFormValues,
  useSetFormValue,
  useSteps,
  useLiveFormValues,
  useToggleGlobalValidation,
  useFormValidationRules,
};
