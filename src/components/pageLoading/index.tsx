import './loading.scss'

type AppProps = {
  text?: string
}

export default function PageLoading(props: AppProps) {
  const text = props.text || 'loading'
  return (
    <div className="page-loading-component" onClick={e => e.stopPropagation()}>
      <div className="sk-chase">
        <div className="sk-chase-dot"/>
        <div className="sk-chase-dot"/>
        <div className="sk-chase-dot"/>
        <div className="sk-chase-dot"/>
        <div className="sk-chase-dot"/>
        <div className="sk-chase-dot"/>
      </div>
      <div className={'div-loading-text'}>{text}</div>
    </div>
  )

}
