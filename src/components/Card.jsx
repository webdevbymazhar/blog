import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ id, image, title, description, category }) {
  return (
    <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <img
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <span className="text-sm text-blue-500 font-medium">{category}</span>
        <h3 className="mt-2 text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        <div dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        </p>
        <button className="mt-4 inline-block text-blue-600 font-medium text-sm hover:underline">
          <Link href={`/blog/${id}`}>Read More →</Link>
        </button>
      </div>
    </div>
  );
}

