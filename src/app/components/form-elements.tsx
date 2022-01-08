import * as React from "react"
import clsx from "clsx"
import { useId } from "@reach/auto-id"

function Label({ className, ...labelProps }: JSX.IntrinsicElements["label"]) {
  return (
    <label
      {...labelProps}
      className={clsx(
        "inline-block text-lg text-gray-500 dark:text-blueGray-500",
        className,
      )}
    />
  )
}

type InputProps =
  | ({ type: "textarea" } & JSX.IntrinsicElements["textarea"])
  | JSX.IntrinsicElements["input"]

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref,
) {
  const className = clsx(
    "block py-2 px-3 w-full placeholder:text-gray-400 rounded-md border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 shadow-sm appearance-none sm:text-sm",
    props.className,
  )

  if (props.type === "textarea") {
    return (
      <textarea
        {...(props as JSX.IntrinsicElements["textarea"])}
        className={className}
      />
    )
  }

  return (
    <input
      {...(props as JSX.IntrinsicElements["input"])}
      className={className}
      ref={ref}
    />
  )
})

interface InputErrorProps {
  id: string
  children?: string | null
}

function InputError({ children, id }: InputErrorProps) {
  if (!children) {
    return null
  }

  return (
    <p role="alert" id={id} className="text-sm text-red-500">
      {children}
    </p>
  )
}

const Field = React.forwardRef<
  HTMLInputElement,
  {
    defaultValue?: string | null
    name: string
    label: string
    className?: string
    error?: string | null
    description?: React.ReactNode
  } & InputProps
>(function Field(
  { defaultValue, error, name, label, className, description, id, ...props },
  ref,
) {
  const prefix = useId()
  const inputId = id ?? `${prefix}-${name}`
  const errorId = `${inputId}-error`
  const descriptionId = `${inputId}-description`

  return (
    <div className={clsx("mb-8", className)}>
      <div className="flex gap-2 justify-between items-baseline mb-4">
        <Label htmlFor={inputId}>{label}</Label>
        {error ? (
          <InputError id={errorId}>{error}</InputError>
        ) : description ? (
          <div id={descriptionId} className="text-lg text-primary">
            {description}
          </div>
        ) : null}
      </div>

      <Input
        // @ts-expect-error no idea 🤷‍♂️
        ref={ref}
        {...(props as InputProps)}
        name={name}
        id={inputId}
        autoComplete={name}
        required
        defaultValue={defaultValue}
        aria-describedby={
          error ? errorId : description ? descriptionId : undefined
        }
      />
    </div>
  )
})

function ButtonGroup({
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
}) {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      {children}
    </div>
  )
}

function ErrorPanel({
  children,
  id,
}: {
  children: React.ReactNode
  id?: string
}) {
  return (
    <div role="alert" className="relative py-8 px-11 mt-8" id={id}>
      <div className="absolute inset-0 bg-red-500 rounded-lg opacity-25" />
      <div className="relative text-lg font-medium text-primary">
        {children}
      </div>
    </div>
  )
}

export { Label, Input, InputError, Field, ButtonGroup, ErrorPanel }
