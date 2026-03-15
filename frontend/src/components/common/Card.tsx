type Props = {
  image?: string;
  title: string;
  description?: string;
  footer?: React.ReactNode;
};

const Card = ({ image, title, description, footer }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md 
                    hover:shadow-xl transition-all duration-300
                    flex flex-col overflow-hidden h-full">

      {image && (
        <div className="h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-gray-600 text-sm flex-grow">
            {description}
          </p>
        )}

        {footer && (
          <div className="mt-4">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
