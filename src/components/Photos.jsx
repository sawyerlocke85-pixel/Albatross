import { useRef, useState } from 'react'

/** Responsive photo grid; clicking a photo shows it larger in a plain dialog. */
export default function Photos({ photos, title }) {
  const dialog = useRef(null)
  const [current, setCurrent] = useState(null)

  const open = (photo) => {
    setCurrent(photo)
    dialog.current.showModal()
  }
  const close = () => dialog.current.close()

  return (
    <>
      <ul className="photos">
        {photos.map((p) => (
          <li key={p.file}>
            <figure className="photo">
              <button type="button" className="photo__btn" onClick={() => open(p)} aria-label={`View larger: ${p.caption || title}`}>
                <img
                  src={p.src}
                  srcSet={p.srcset}
                  sizes="(max-width: 767px) 100vw, 30vw"
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  decoding="async"
                  alt={p.caption || `Photo from “${title}”`}
                />
              </button>
              {p.caption && <figcaption>{p.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={current?.caption || title}
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={() => setCurrent(null)}
      >
        <button type="button" className="lightbox__close" onClick={close}>
          Close
        </button>
        {current && (
          <figure className="lightbox__figure" onClick={(e) => e.target === e.currentTarget && close()}>
            <img src={current.src} width={current.w} height={current.h} alt={current.caption || `Photo from “${title}”`} />
            {current.caption && <figcaption>{current.caption}</figcaption>}
          </figure>
        )}
      </dialog>
    </>
  )
}
