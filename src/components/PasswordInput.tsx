import { useState } from "react";
import type { UsePasswordValidationReturn } from "../hooks/usePasswordValidation";

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder?: string;
  hook: UsePasswordValidationReturn;
}

export function PasswordInput({
  id,
  label,
  placeholder = "••••••••",
  hook,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    password,
    setPassword,
    setTouched,
    rules,
    strength,
    strengthLabel,
    strengthColor,
    errorMessage,
  } = hook;

  const bars = [1, 2, 3, 4] as const;

  const strengthTextColor: Record<number, string> = {
    1: "text-red-400",
    2: "text-orange-400",
    3: "text-yellow-500",
    4: "text-green-600",
  };

  return (
    <div className="form-group mb-5 sm:mb-[30px]">
      <label
        htmlFor={id}
        className="block text-sm sm:text-base font-medium mb-2 text-[#021926]"
      >
        {label}
      </label>

      
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={password}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          onBlur={() => setTouched(true)}
          className={`w-full border rounded-lg p-2.5 sm:p-3 pr-10 text-sm sm:text-base outline-none focus:ring-2 transition
            ${
              errorMessage
                ? "border-red-400 focus:ring-red-300"
                : "border-[#d3d3d3] focus:ring-[#546873]"
            }`}
        />

        
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7a9.77 9.77 0 012.168-3.168M6.343 6.343A9.956 9.956 0 0112 5c5 0 9 4 9 7a9.956 9.956 0 01-1.343 2.657M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>

      
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}

      
      {password.length > 0 && (
        <div className="mt-3">
          <div className="flex gap-1 mb-1">
            {bars.map((bar) => (
              <div
                key={bar}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  bar <= strength ? strengthColor : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          {strengthLabel && (
            <p className="text-xs text-gray-500">
              Força:{" "}
              <span
                className={`font-semibold ${
                  strengthTextColor[strength] ?? "text-gray-400"
                }`}
              >
                {strengthLabel}
              </span>
            </p>
          )}
        </div>
      )}

      
      {password.length > 0 && (
        <ul className="mt-3 space-y-1">
          {rules.map((rule) => (
            <li
              key={rule.id}
              className={`flex items-center gap-2 text-xs transition-colors ${
                rule.passed ? "text-green-600" : "text-gray-400"
              }`}
            >
              {rule.passed ? (
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                </svg>
              )}
              {rule.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}