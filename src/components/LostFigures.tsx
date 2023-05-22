import {FC} from 'react'
import { Figure } from '../models/figures/Figure';

interface LostFiguresProps {
  title: string;
  figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
  return (
    <div
      className='lost-figures'
    >
      <h3>
        {title}
      </h3>
      <div
        className='lost-figures-cards'
      >
        {
          figures.map((figure, index) => 
            <div key={index}>
              <span>{figure.name}</span>
              {figure.image && <img width='20px' src={figure.image}/>}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default LostFigures