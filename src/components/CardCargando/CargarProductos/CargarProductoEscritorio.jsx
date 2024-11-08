import { Skeleton } from '@nextui-org/react';

export const CargarProductosEscritorio = () => {
  return (
    <>
      {
        <div className='flex'>
          {/* Parte izquierda */}
          <div className='w-1/2 sm:ml-40'>
            <Skeleton className='rounded-lg sm:m-5 h-96 w-80 m-auto mb-10 sm:ml-24' />
            <div className='flex m-5'>
              <Skeleton className='rounded-lg w-20 h-32 sm:m-5 m-auto ' />
              <Skeleton className='rounded-lg w-20 h-32 sm:m-5 m-auto ' />
              <Skeleton className='rounded-lg w-20 h-32 sm:m-5 m-auto ' />
              <Skeleton className='rounded-lg w-20 h-32 sm:m-5 m-auto ' />
            </div>
          </div>

          {/* Parte derecha */}
          <div className='w-1/2 ml-6'>
            <div className='flex ml-10 my-10'>
              <Skeleton className='h-5 w-40 rounded-lg mr-32' />
              <Skeleton className='h-5 w-20 rounded-lg' />
            </div>
            <div className='mx-5'>
              <Skeleton className='h-5 w-full rounded-lg my-2' />
              <Skeleton className='h-5 w-full rounded-lg my-2' />
              <Skeleton className='h-5 w-full rounded-lg my-2' />
              <Skeleton className='h-5 w-full rounded-lg my-2' />
              <Skeleton className='h-5 w-full rounded-lg my-2' />
            </div>
            <div className='flex ml-10 my-10'>
              <Skeleton className='h-5 w-40 rounded-lg mr-32' />
            </div>
            <div className='flex m-auto my-5'>
              <Skeleton className='flex rounded-full w-12 h-12 mx-5' />
              <Skeleton className='flex rounded-full w-12 h-12 mx-5' />
              <Skeleton className='flex rounded-full w-12 h-12 mx-5' />
              <Skeleton className='flex rounded-full w-12 h-12 mx-5' />
              <Skeleton className='flex rounded-full w-12 h-12 mx-5' />
            </div>
            <div className='flex ml-10 my-10'>
              <Skeleton className='h-5 w-40 rounded-lg mr-32' />
            </div>
            <div className='flex m-auto my-5'>
              <Skeleton className='flex rounded-full w-12 h-12 mx-5' />
              <Skeleton className='flex rounded-full w-12 h-12 mx-5' />
              <Skeleton className='flex rounded-full w-12 h-12 mx-5' />
              <Skeleton className='flex rounded-full w-12 h-12 mx-5' />
              <Skeleton className='flex rounded-full w-12 h-12 mx-5' />
            </div>
            <div className='flex m-auto my-5 mx-5 sm:ml-44'>
              <Skeleton className='flex rounded-full h-16 mx-5 m-3 p-4 w-44 justify-items-center text-center' />
              <Skeleton className='flex rounded-full h-16 mx-5 m-3 p-4 w-44 justify-items-center text-center' />
            </div>
          </div>
        </div>
      }
    </>
  );
};
