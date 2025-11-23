import React from 'react';

const GradientText = ({ 
  children, 
  variant = 'blue' 
}: { 
  children: React.ReactNode; 
  variant?: 'blue' | 'green' | 'orange' | 'purple' | 'indigo' | 'green-orange' 
}) => {
  const gradientClasses = {
    blue: "from-blue-600 via-blue-500 to-blue-700 bg-gradient-to-tr",
    green: "from-green-600 via-lime-500 to-yellow-500 bg-gradient-to-br",
    orange: "from-amber-500 via-orange-500 to-red-500 bg-gradient-to-r",
    purple: "from-indigo-600 via-purple-500 to-pink-500 bg-gradient-to-br",
    indigo: "from-indigo-600 via-indigo-500 to-purple-600 bg-gradient-to-tr",
    "green-orange": "from-green-500 via-yellow-500 to-orange-500 bg-gradient-to-r"
  };

  return (
    <span className={`inline-block ${gradientClasses[variant]} bg-clip-text text-transparent transition-opacity duration-300 hover:opacity-90`}>
      {children}
    </span>
  );
};

export { GradientText };