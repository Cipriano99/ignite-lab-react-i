import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames'

interface LessosProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class"
}

export const Lesson = ({ title, slug, availableAt, type }: LessosProps) => {
  const { slug: slugParams } = useParams<{ slug: string }>()

  const isLessonAvaliable = isPast(availableAt)
  const availableDateFormatted = format(availableAt, "EEEE' · 'd' de 'MMMM' · 'k'h'mm", {
    locale: ptBR
  })

  const isActiveLesson = slugParams === slug

  return (
    <Link to={`/event/lesson/${slug}`} className='group'>
      <span>{availableDateFormatted}</span>

      <div
        className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
          'bg-green-500': isActiveLesson
        })}
      >
        <header className="flex items-center justify-between">
          {isLessonAvaliable ? (
            <span className={classNames('text-sm font-medium flex items-center gap-2', {
              'text-white': isActiveLesson,
              'text-blue-500': !isActiveLesson,
            })}>
              <CheckCircle size={20} />
              Conteúdo libereado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border font-bold', {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson,
          })}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>
        <strong className={classNames('mt-5 block', {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson
        })}>
          {title}
        </strong>
      </div>
    </Link>
  )
}