import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { paginationHeroes, nextPage, previusPage, paginationSearch } from '../../store/actions/pagination_heroes'
import { Modal, Button, Input, Icon, Spin } from 'antd'

import './index.css'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2),
		margin: "20px",
		textAlign: 'end'
	},
	button: {
		margin: theme.spacing(1),
	},
	input: {
		display: 'none',
	},
}));

export default function Heroes() {
	let paginationSelector = useSelector(
		(state) => state.PaginationHeroes
	)

	let dispatch = useDispatch()
	let getHeroes = () => dispatch(paginationHeroes())
	let next = () => dispatch(nextPage())
	let prev = () => dispatch(previusPage())
	let searchHeroes = (value) => dispatch(paginationSearch(value))

	const [modal, setModal] = useState({
		visible: false,
		hero: []
	})

	useEffect(() => {
		getHeroes()
	}, [])

	function showModal(hero) {
		setModal({
			visible: true,
			hero
		})
	}

	let { currPage, loading } = paginationSelector
	const classes = useStyles()
	const { Search } = Input
	const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />
	return (
		<>
			<Paper className={classes.root}>
				<Search
					className="search"
					placeholder="Search a Hero"
					style={{ width: 200 }}
					enterButton
					onSearch={value => {
						if (value === '') {
							getHeroes()
						} else {
							searchHeroes(value)
						}
					}}
				/>
				<div className="group">
					<Spin indicator={antIcon} spinning={loading}>
						{currPage &&
							<>
								<div className="grid">
									{currPage.data.map(hero =>
										<div className="item"
											key={hero.id}
											onClick={() => {
												showModal(hero)
												console.log(modal)
											}}
										>
											<p className="name">{hero.name}</p>
											<img src={`${hero.thumbnail.path}/portrait_fantastic.${hero.thumbnail.extension}`} />
										</div>)}
								</div>
								<div className="group">
									<Button type="primary" className={classes.button} onClick={() => prev()}>Back</Button>
									<Button type="primary" className={classes.button} onClick={() => next()}>Next</Button>
								</div>
							</>
						}
					</Spin>
				</div>
			</Paper>
			<Modal
				visible={modal.visible}
				onCancel={() => setModal({ visible: false, hero: [] })}
				footer={[
					<>
						<Button onClick={() => setModal({ visible: false, hero: [] })}>
							Exit
						</Button>
					</>
				]}
			>
				<h2>{modal.hero.name}</h2>
				<p>{modal.hero.description ? modal.hero.description : "Without description"}</p>
			</Modal>
		</>
	)
}
