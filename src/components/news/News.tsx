import {FC, useState} from 'react'
import s from './News.module.css'
import {NewsList} from './newsList/NewsList'
import {NewsTitle} from './newsTitlle/NewsTitlle'
import {SearchNews} from './searchNews/SearchNews'

export const News: FC = () => {
	const [search, setSearch] = useState('')

	return (
		<>
			<div className={s.news_title_search}>
				<NewsTitle/>
				<SearchNews onSubmit={setSearch}/>
			</div>
			<NewsList searchText={search}/>
		</>
	)
}
