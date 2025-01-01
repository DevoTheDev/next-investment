import { default_NewsSentiments, getDefaultImage } from '@/constants'
import React from 'react'
import { validateForUse } from '@/lib/utils';

type NewsSentimentProps<T extends typeof default_NewsSentiments.feed[0]> = {
    sentiment: T;
};

const NewsSentiment = <T extends typeof default_NewsSentiments.feed[0]>(
    props: NewsSentimentProps<T>
) => {
    const { sentiment } = props;

    const {
        banner_image,
        title,
        summary,
        source,
        authors,
        source_domain,
        url,
        overall_sentiment_label,
        overall_sentiment_score,
        topics,
        time_published,
    } = validateForUse(sentiment);

    const bannerImage =
        banner_image && banner_image.trim() !== ''
            ? banner_image
            : getDefaultImage();

    // Format the published time
    const formattedTime =
        time_published &&
        new Date(
            time_published.slice(0, 4), // Year
            parseInt(time_published.slice(4, 6)) - 1, // Month (0-indexed)
            time_published.slice(6, 8), // Day
            time_published.slice(9, 11), // Hour
            time_published.slice(11, 13) // Minute
        ).toLocaleString();

    return (
        <div className="flex bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer items-start overflow-hidden border border-gray-700 hover:border-cyan-400">
            {/* Image Section */}
            {bannerImage && (
                <img
                    className="w-48 h-48 object-cover rounded-l-xl hover:scale-105 transform transition-transform duration-300"
                    src={bannerImage}
                    alt={title || "News Image"}
                />
            )}

            {/* Content Section */}
            <div className="flex flex-col p-4 space-y-4 flex-grow">
                {/* Title */}
                {title && (
                    <h2 className="text-lg font-bold text-cyan-300 hover:underline hover:text-cyan-400 transition-colors duration-300">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            {title}
                        </a>
                    </h2>
                )}

                {/* Summary */}
                {summary && (
                    <p className="text-sm font-light text-gray-300 leading-relaxed">
                        {summary}
                    </p>
                )}

                {/* Sentiment */}
                {overall_sentiment_label && (
                    <div className="text-sm">
                        <strong
                            className={`px-2 py-1 rounded ${
                                overall_sentiment_label.includes("Bullish")
                                    ? "bg-green-500 text-gray-900"
                                    : overall_sentiment_label.includes("Bearish")
                                    ? "bg-red-500 text-gray-900"
                                    : "bg-gray-600 text-gray-200"
                            }`}
                        >
                            {overall_sentiment_label}
                        </strong>{" "}
                        <span className="text-gray-400">
                            ({overall_sentiment_score!.toFixed(2)})
                        </span>
                    </div>
                )}

                {/* Topics */}
                {topics && topics.length > 0 && (
                    <div className="text-sm text-gray-400 space-y-1">
                        <strong className="block text-gray-500">Topics:</strong>
                        <div className="flex flex-wrap gap-2">
                            {topics.map((topic, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-sm bg-gray-700 text-cyan-400 rounded-lg"
                                >
                                    {topic.topic} (
                                    {parseFloat(topic.relevance_score).toFixed(2)})
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer Section */}
                <div className="flex flex-col space-y-2 border-t border-gray-700 pt-4">
                    {/* Source and Authors */}
                    {source && (
                        <a
                            className="text-cyan-400 text-sm font-medium hover:underline hover:text-cyan-300 transition-colors duration-300"
                            href={source_domain}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {source}
                        </a>
                    )}
                    <span className="text-gray-400 text-xs font-thin">
                        {authors ? authors.join(", ") : "No authors provided"}
                    </span>
                    {/* Time Published */}
                    {time_published && (
                        <span className="text-gray-500 text-xs">
                            Published on: {formattedTime}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsSentiment;
