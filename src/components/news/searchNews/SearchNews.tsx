import Search from 'antd/es/input/Search'
import {FC, useState} from 'react'

export const SearchNews: FC<OwnProps> = ({onSubmit}) => {
	const [searchLine, setSearchLine] = useState('')

	return <>
		<div>
			<Search
				placeholder='input search text'
				value={searchLine}
				onChange={(e) => setSearchLine(e.currentTarget.value)}
				onSearch={() => onSubmit(searchLine)}
				enterButton/>
		</div>
	</>
}

type OwnProps = {
	onSubmit: (searchLine: string) => void
}
