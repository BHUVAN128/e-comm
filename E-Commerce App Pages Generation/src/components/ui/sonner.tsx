import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'bg-white border border-gray-200 text-gray-900 shadow-lg',
          description: 'text-gray-600',
          actionButton: 'bg-pink-500 text-white',
          cancelButton: 'bg-gray-100 text-gray-900',
          error: 'bg-red-50 border-red-200 text-red-900',
          success: 'bg-green-50 border-green-200 text-green-900',
          warning: 'bg-amber-50 border-amber-200 text-amber-900',
          info: 'bg-blue-50 border-blue-200 text-blue-900',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
