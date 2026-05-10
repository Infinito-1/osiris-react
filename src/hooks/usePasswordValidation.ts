import { useState, useMemo } from "react";

interface PasswordRule {
  id: string;
  label: string;
  test: (value: string) => boolean;
}

export interface PasswordRuleResult {
  id: string;
  label: string;
  passed: boolean;
}

export type StrengthLevel = 0 | 1 | 2 | 3 | 4;

export interface UsePasswordValidationReturn {
  password: string;
  setPassword: (value: string) => void;
  touched: boolean;
  setTouched: (value: boolean) => void;
  rules: PasswordRuleResult[];
  strength: StrengthLevel;
  strengthLabel: string;
  strengthColor: string;
  isValid: boolean;
  errorMessage: string | null;
}

const PASSWORD_RULES: PasswordRule[] = [
  {
    id: "minLength",
    label: "Mínimo de 8 caracteres",
    test: (v) => v.length >= 8,
  },
  {
    id: "uppercase",
    label: "Pelo menos 1 letra maiúscula",
    test: (v) => /[A-Z]/.test(v),
  },
  {
    id: "lowercase",
    label: "Pelo menos 1 letra minúscula",
    test: (v) => /[a-z]/.test(v),
  },
  {
    id: "number",
    label: "Pelo menos 1 número",
    test: (v) => /[0-9]/.test(v),
  },
  {
    id: "specialChar",
    label: "Pelo menos 1 caractere especial (!@#$...)",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];

interface StrengthMeta {
  label: string;
  color: string;
}

const STRENGTH_META: StrengthMeta[] = [
  { label: "",        color: "bg-gray-200"   },
  { label: "Fraca",   color: "bg-red-400"    },
  { label: "Regular", color: "bg-orange-400" },
  { label: "Boa",     color: "bg-yellow-400" },
  { label: "Forte",   color: "bg-green-500"  },
];

export function usePasswordValidation(
  initialValue: string = ""
): UsePasswordValidationReturn {
  const [password, setPassword] = useState<string>(initialValue);
  const [touched, setTouched] = useState<boolean>(false);

  const rules: PasswordRuleResult[] = useMemo(
    () =>
      PASSWORD_RULES.map((rule) => ({
        id: rule.id,
        label: rule.label,
        passed: password.length > 0 ? rule.test(password) : false,
      })),
    [password]
  );

  const passedCount = rules.filter((r) => r.passed).length;
  const isValid = passedCount === PASSWORD_RULES.length;

  const strength = (
    password.length === 0 ? 0 : Math.min(passedCount, 4)
  ) as StrengthLevel;

  const errorMessage: string | null =
    touched && password.length === 0
      ? "A senha não pode ser vazia."
      : touched && !isValid
      ? "A senha não atende todos os requisitos."
      : null;

  return {
    password,
    setPassword,
    touched,
    setTouched,
    rules,
    strength,
    strengthLabel: STRENGTH_META[strength].label,
    strengthColor: STRENGTH_META[strength].color,
    isValid,
    errorMessage,
  };
}