
const BoardsScreen = () => {
  return (
    <div className='boards'>
        <section className='boards__container'>
          <div className='boards__control'>
          </div>
          <div className='boards__wrapper'>
            <div className='boards__todo board'>
              <div className='board__header'>
                <h2 className='board__title'>
                  To Do
                </h2>
                <button className='board__button'> </button>
              </div>
            </div>
            <div className='boards__on-going board'>
              <div className='board__header'>
                <h2 className='board__title'>
                  On Going
                </h2>
                <button className='board__button'> </button>
              </div>
            </div>
            <div className='boards__completed board'>
              <div className='board__header'>
                <h2 className='board__title'>
                  Completed
                </h2>
                <button className='board__button'> </button>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}

export default BoardsScreen;

