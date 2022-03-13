import { Link } from "remix"

interface Props {
  slug: string
  imgSrc: string | null
  name: string | null
  showFollowers?: boolean
}

export default function Avatar({
  slug,
  imgSrc,
  name,
  showFollowers = false,
}: Props) {
  return (
    <Link to={slug} className="group block shrink-0">
      <div className="flex items-center">
        <div>
          <img
            className="inline-block h-10 w-10 rounded-full"
            src={imgSrc ?? ""}
            alt="profile"
          />
        </div>
        <div className="ml-3">
          <p className="text-base font-medium text-gray-800 group-hover:text-gray-900">
            {name}
          </p>
          <p className="text-xs text-gray-500 group-hover:text-gray-700">
            96 followers
          </p>
        </div>
      </div>
    </Link>
  )
}
