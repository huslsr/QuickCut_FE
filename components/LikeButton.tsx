"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import { interactionService } from "@/app/api/services/interactionService";
import { getGuestId } from "@/app/utils/guestId";

export default function LikeButton({
  articleId,
  initialCount,
}: {
  articleId: string;
  initialCount?: number;
}) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount ?? 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch if initialCount is undefined (not provided by parent)
    if (initialCount === undefined) {
      interactionService.getLikeCount(articleId).then(setCount);
    }

    // Check status if user is logged in
    const actorId = user?.id || getGuestId();
    if (actorId) {
      interactionService.getLikeStatus(articleId, actorId).then(setLiked);
    }
  }, [articleId, user, initialCount]);

  const handleToggle = async () => {
    // if (!user) return; // Removed to allow guest likes
    if (loading) return;

    const actorId = user?.id || getGuestId();

    setLoading(true);
    try {
      const response = await interactionService.toggleLike(articleId, actorId);
      setLiked(response.liked);
      setCount((prev) => (response.liked ? prev + 1 : prev - 1));
    } catch (err) {
      console.error("Failed to toggle like", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="flex items-center space-x-2 group transition-colors"
      title={user ? "" : "Like as Guest"}
    >
      <div
        className={`p-2 rounded-full transition-colors ${
          liked
            ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
        }`}
      >
        <svg
          className={`w-5 h-5 ${
            liked ? "fill-current" : "fill-none"
          } stroke-current`}
          viewBox="0 0 24 24"
          transform={liked ? "scale(1.1)" : "scale(1)"}
          style={{ transition: "transform 0.2s" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>
      <span
        className={`font-mono text-sm font-bold ${
          liked
            ? "text-red-600 dark:text-red-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
