import { url } from "inspector"

interface MovieCardProps {
    index:any,
    id:any,
    title:string,
    image:string
}
export const MovieCard: React.FC<MovieCardProps> = ({index,id,title,image}) => {
    return (
        <div className="w-full flex">
            <div className="h-48 lg:h-44 lg:w-32 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage:`url(${image})`}} title={title}>
            </div>
            <div className="flex-1 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
                    {/* <p className="text-gray-700 text-base">{description}</p> */}
                </div>
            </div>
        </div>
    )
}