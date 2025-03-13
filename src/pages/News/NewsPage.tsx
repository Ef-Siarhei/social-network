import {FC} from 'react'
import {NewsList} from '../../components/news/newsList/NewsList'
import {NewsTitle} from '../../components/news/newsTitlle/NewsTitlle'

export const NewsPage: FC = () => {
	return (
		<>
			<NewsTitle/>
			<NewsList/>
		</>
	)
}
