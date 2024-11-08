export const Titulo = ({ titulo, precio }) => {
  return (
    <div className='flex justify-between items-center p-1 w-full mt-4'>
      <div className='text-2xl font-bold  flex-grow'>{titulo}</div>
      <div className='text-xl font-bold text-left mr-8'>${precio}</div>
    </div>
  );
};
