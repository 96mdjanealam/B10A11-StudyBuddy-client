import { FaClipboardList, FaCheckCircle, FaUsers } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaClipboardList className="text-blue-500 text-5xl" />,
      title: "Create Assignments",
      description: "Easily design and share assignments tailored to your group's needs.",
    },
    {
      icon: <FaCheckCircle className="text-green-500 text-5xl" />,
      title: "Evaluate Progress",
      description: "Track performance and ensure everyone stays on the same page.",
    },
    {
      icon: <FaUsers className="text-purple-500 text-5xl" />,
      title: "Collaborative Learning",
      description: "Work together seamlessly with interactive tools and resources.",
    },
  ];

  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Why Choose Study Buddy?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
