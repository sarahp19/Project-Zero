import { auth } from './app';

function Posts(props: any) {
    const user = auth.currentUser?.uid;

    const  Data = JSON.parse(props.post);

    return (
        <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700">
            <div className="pr-8 pl-8 pt-4">
                <div className="flex self-center justify-right items-center mb-2 bg-gray-900 rounded-xl pr-4 ">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="w-12 h-12 rounded-full"
                            src="https://www.trendytarzen.com/wp-content/uploads/2021/07/2-1.jpg"
                            alt="Neil image"
                        />
                        <h3 className="font-bold tracking-tight text-gray-800 dark:text-white text-xl m-4">
                            {Data.UserID}
                        </h3>
                    </div>
                </div>
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {Data.caption}
                    </h5>
                </a>

                {(Data.description == '') ||
                (Data.description == undefined) ? (
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {' '}
                        No description found
                    </p>
                ) : (
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {Data}
                    </p>
                )}
                <div className="grid grid-cols-5 p-2">
                    <img
                        className="rounded w-80 col-span-3 col-start-2 shadow-xl mb-3"
                        src={Data.content}
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
    // return <h1>Hello?</h1>
}

export default Posts;
