interface SectionHeadingProps {
  label: string
  title: string
  body?: string
}

export function SectionHeading({ label, title, body }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-label">{label}</div>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  )
}
