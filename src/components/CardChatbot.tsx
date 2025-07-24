import Image from "./Image";
interface Iprops {
  imageurl: string;
  alt: string;
  title: string;
  description: string;
  className?: string;
}
const CardChatbot = ({
  title,
  description,
  alt,
  imageurl,
  className,
}: Iprops) => {
  return (
    <div
      className={`h-auto rounded-2xl 
  bg-gradient-to-br from-purple-800 to-purple-900/10 text-white 
  font-nunito p-5 flex flex-col gap-3 shadow-lg backdrop-blur-md 
  transition-transform hover:scale-[1.02] duration-300 ${className}`}
    >
      {/* Centered Image with white border */}
      <div className="flex justify-center">
        <Image
          imageurl={imageurl}
          alt={alt}
          className="w-14 h-14 rounded-full mb-2 shadow-md border-none outline-none"
        />
      </div>

      {/* Text Content */}
      <h1 className="text-xl font-semibold text-center">{title}</h1>
      <p className="text-sm opacity-90 leading-relaxed text-center">
        {description}
      </p>
    </div>
  );
};

export default CardChatbot;
