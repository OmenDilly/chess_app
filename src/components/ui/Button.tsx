import {FC} from 'react'

interface ButtonProps {
  title: string | undefined;
  icon: string | undefined;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({title, icon, onClick}) => {
  return (
    <button
      className={['btn'].join(' ')}
      onClick={onClick}
    >
      {icon && <span className='material-icons'>{icon}</span>}
      {title && <span>{title}</span>}
    </button>
  )
}

export default Button