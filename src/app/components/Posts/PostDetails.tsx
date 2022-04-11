import React from "react"
import { ASSETS_CDN_LINK, CARD_ACTIONS } from "~/utils/constants"
import { formatDistanceToNow } from "date-fns"
import { PostActionButton } from "../ActionButton"
import LikeIcon from "../icons/Like"
import CommentIcon from "../icons/Comment"
import { FormattedInteractionsPostData } from "~/services/db/formatters.server"
import { enUS } from "date-fns/locale"

type Props = {
  post: FormattedInteractionsPostData
}

const PostDetails = ({ post }: Props) => {
  return (
    <>
      <div className="mt-1 flex space-x-1 text-xs text-gray-400">
        <a
          href={post.CreatedBy.id}
          className="flex items-center space-x-1 text-indigo-700"
        >
          <img
            className="inline-block h-4 w-4 rounded-full"
            src={ASSETS_CDN_LINK + post.CreatedBy.profilePicture || ""}
            alt="profile"
          />
          <span>{post.CreatedBy.name}</span>
        </a>
        <span>&middot;</span>
        <span>
          {formatDistanceToNow(new Date(post.createdAt), {
            locale: enUS,
            includeSeconds: true,
            addSuffix: true,
          }).replace("hour", "hr")}
        </span>
        <span>&middot;</span>
        <span>{"6k"}</span>
      </div>
      <div className="mt-2 flex space-x-1.5 text-xs text-gray-500">
        <PostActionButton
          btnProps={{
            className:
              "flex items-center py-0.5 px-1 space-x-1 hover:text-indigo-500 focus:text-indigo-500 hover:bg-indigo-50 focus:bg-indigo-50 rounded-sm",
          }}
          formPayload={{
            postId: post.id,
            postSlug: post.slug,
          }}
          actionName={
            post.reactedByLoggedInUser
              ? CARD_ACTIONS.UNDO_LIKE
              : CARD_ACTIONS.LIKE
          }
        >
          <LikeIcon
            height={16}
            width={16}
            variant={post.reactedByLoggedInUser ? "filled" : "outline"}
          />
          {post.reactionsCount > 0 && <span>{post.reactionsCount}</span>}
        </PostActionButton>
        <div className="flex items-center space-x-1 rounded-sm py-0.5 px-1 hover:bg-indigo-50 hover:text-indigo-500 focus:bg-indigo-50 focus:text-indigo-500">
          <CommentIcon
            variant={post.commentedByLoggedInUser ? "filled" : "outline"}
            height={16}
            width={16}
          />
          {post._count.PostComments > 0 && (
            <span>{post._count.PostComments}</span>
          )}
        </div>
      </div>
    </>
  )
}

export default PostDetails
