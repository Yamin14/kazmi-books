interface Props {
    heading: string
}

const GenreHeading = ({heading} : Props) => {
  return (
    <h1 className="mx-10 p-1 md:p-2 bg-gray-800 text-white text-xl md:text-2xl font-medium">
        {heading}
    </h1>
  )
}

export default GenreHeading