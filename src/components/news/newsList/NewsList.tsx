import {Col, Row} from 'antd'
import axios from 'axios'
import {FC, useEffect, useState} from 'react'
import {v1} from 'uuid'
import Preloader from '../../common/Preloader/Preloader'
import {NewsListItem} from '../newsListItem/NewsListItem'
import s from './NewsList.module.css'

const NEWS_API_KEY = '16685a2bb69a4455a00935f17819e5c6'

export const NewsList: FC = () => {
	const [newsList, setNewsList] = useState<News[]>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		axios
			.get<ResultNews>(`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${NEWS_API_KEY}`)
			.then(res => {
				setNewsList(res.data.articles)
				setLoading(false)
			})
	}, [])

	return (
		loading
			? <Preloader/>
			: <Row gutter={[16, 16]} className={s.newsList}>
				{newsList
					.filter(news => news.urlToImage)
					.map(news => {
						return <Col key={v1()} className='gutter-row' md={{span: 12}} lg={{span: 12}}
						            xl={{span: 8}} xxl={{span: 6}}>
							<NewsListItem news={news}/>
						</Col>
					})}
			</Row>
	)
}

export type News = {
	author: null | string
	title: null | string
	description: null | string
	urlToImage: null | string
	publishedAt: null | string
	content: null | string
	url: null | string
}

type ResultNews = {
	articles: News[]
}

