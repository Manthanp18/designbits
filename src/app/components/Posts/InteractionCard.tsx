import { Link } from "remix"
import { motion } from "framer-motion"
import {
  FormattedInteractionsPostData,
  FormattedRelatedPostData,
} from "~/services/db/formatters.server"
import VideoPlayer from "./VideoPlayer"
import Picture from "../common/Picture"
import PostDetails from "./PostDetails"
import clsx from "clsx"

type Props =
  | {
      post: FormattedInteractionsPostData & {
        backgroundColorClass?: string
      }
      index: number
      showDetails?: true
    }
  | {
      post: FormattedRelatedPostData & {
        backgroundColorClass?: string
      }
      index: number
      showDetails?: false
    }

const InteractionCard: React.FC<Props> = ({
  post,
  index,
  showDetails = true,
}) => {
  return (
    <motion.div
      key={post.id}
      initial={{ scale: 0.85, translateY: "-10%" }}
      animate={{ scale: 1, translateY: 0 }}
      transition={{
        delay: 0.1 * index,
        x: { type: "spring", stiffness: 100 },
        default: { duration: 0.5 },
      }}
    >
      <motion.div
        className="relative w-full overflow-hidden rounded-lg bg-gray-200"
        whileHover={{ scale: 1.05 }}
      >
        <Link
          className={clsx(
            post.backgroundColorClass || "bg-gray-800",
            "group relative block aspect-square h-60 w-full",
          )}
          to={`/interaction/${post.slug}`}
          prefetch="intent"
        >
          <VideoPlayer
            backgroundColorClass={post.backgroundColorClass}
            videoSources={post.VideoSources}
          />
          <div className="absolute top-0 h-16 w-60 bg-gradient-to-br from-gray-800/80 via-transparent p-3 transition-transform group-hover:-translate-y-full group-hover:bg-none">
            <Link
              to="/test"
              className="flex items-center space-x-2 text-xs font-semibold text-gray-200"
            >
              <Picture
                sources={post.Source.formattedLogos}
                imgProps={{
                  src: post.Source.fallBackImage?.url,
                  alt: post.Source.name,
                  className: "h-5 w-5 rounded-md",
                }}
              />
              <span>{post.Source.name}</span>
            </Link>
          </div>
        </Link>
      </motion.div>
      <h3 className="mt-3 text-sm font-semibold text-gray-700">
        <a href={post.slug}>{post.title}</a>
      </h3>
      {showDetails && (
        <PostDetails post={post as FormattedInteractionsPostData} />
      )}
    </motion.div>
  )
}

export default InteractionCard
