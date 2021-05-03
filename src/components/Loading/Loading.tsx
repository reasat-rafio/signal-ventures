import { Hourglass } from 'react95'
import { useCtx } from '../../../store'
import clsx from 'clsx'

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = ({}) => {
    const {
        state: { loading },
    } = useCtx()

    return (
        <div
            className={clsx(
                'fixed h-full w-full right-0 top-0 left-0 bottom-0  flex justify-center items-center  bg-gray-900 opacity-80',
                loading ? 'z-50 block' : 'z-0 hidden',
            )}
        >
            {loading && <Hourglass size={32} />}
        </div>
    )
}
