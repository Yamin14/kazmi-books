interface Props {
    heading: string
}

const GenreHeading = ({heading} : Props) => {
  return (
    <h1 className="mx-10 p-2 bg-gray-800 text-white text-2xl font-medium">
        {heading}
    </h1>
  )
}

export default GenreHeading