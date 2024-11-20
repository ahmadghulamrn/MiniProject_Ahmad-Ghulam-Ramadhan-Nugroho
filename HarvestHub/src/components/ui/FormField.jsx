export const FormField = ({ label, component }) => (
  <div>
    <label className="text-lg font-semibold text-gray-700 mb-2 block">
      {label}
    </label>
    {component}
  </div>
);
