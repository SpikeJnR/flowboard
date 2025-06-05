import type { Dispatch, SetStateAction } from 'react';

type NicknameInputFieldProps = {
  setNickname: Dispatch<SetStateAction<string>>;
};

const NicknameInputField = ({ setNickname }: NicknameInputFieldProps) => {
  return (
    <div className='nickname__input--wrapper'>
      <input
        className='nickname__input input'
        placeholder='Enter the nickname'
        id='nickname__input'
        onChange={evt => setNickname(evt.target.value)}
        required
      />
      <label className='nickname__label input__label' htmlFor='nickname__input'>
        Nickname
      </label>
    </div>
  );
};

export default NicknameInputField;
