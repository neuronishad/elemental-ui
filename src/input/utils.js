// Shared utilities
const sizeClasses = {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-4 py-3 text-lg'
};

const styleVariants = {
    outlined: `
    border border-gray-300 bg-transparent
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  `,
    filled: `
    border border-transparent bg-gray-100
    focus:ring-2 focus:ring-blue-500 focus:bg-gray-50
  `
};

const baseClasses = `
  block w-full rounded-md
  disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200
  read-only:bg-gray-50
  placeholder:text-gray-400
  transition duration-150 ease-in-out
`;

export {
    sizeClasses,
    styleVariants,
    baseClasses,
};
