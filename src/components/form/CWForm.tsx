import { ReactNode, useEffect } from 'react';
import {
  FormProvider,
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormProps,
} from 'react-hook-form';

type TCWFormProps<T extends FieldValues = FieldValues> = {
  onSubmit: SubmitHandler<T>;
  defaultValues?: UseFormProps<T>['defaultValues'];
  children: ReactNode;
};

const CWForm = <T extends FieldValues = FieldValues>({
  onSubmit,
  defaultValues,
  children,
}: TCWFormProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
  });

  useEffect(() => {
    // Only reset if defaultValues is a resolved object
    if (defaultValues && typeof defaultValues !== 'function') {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
    methods.reset(); // Reset the form after submission
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default CWForm;
