import {Card} from 'antd'
import {FC} from 'react'
import {News} from '../newsList/NewsList'
import s from './NewsListItem.module.css'

const {Meta} = Card

export const NewsListItem: FC<OwnProps> = (props) => {
	const {
		author,
		title,
		description,
		urlToImage,
		publishedAt,
		content,
		url
	} = props.news

	return (
		<a href={url ? url : ''} target={'_blank'} rel={'noreferrer'}>
			<Card hoverable
			      cover={!!urlToImage && <img alt='' src={urlToImage}/>}
			>
				<Meta title={title} description={description ? description : content}/>
				<div className={s.author}>
					<span>{`Author: ${author}`}</span>
					<span>{publishedAt?.substr(0, 10).split('-').reverse().join('.')}</span>
				</div>
			</Card>
		</a>
	)
}

type OwnProps = {
	news: News
}
