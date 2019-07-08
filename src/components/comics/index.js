import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { paginationComics, nextPage, previusPage, paginationSearch } from '../../store/actions/pagination_comics'
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

export default function Comics() {
	let paginationSelector = useSelector(
		(state) => state.PaginationComics
	)

	let dispatch = useDispatch()
	let getComics = () => dispatch(paginationComics())
	let next = () => dispatch(nextPage())
	let prev = () => dispatch(previusPage())
	let searchComics = (value) => dispatch(paginationSearch(value))

	const [modal, setModal] = useState({
		visible: false,
		comics: []
	})

	useEffect(() => {
		getComics()
	}, [])

	function showModal(comics) {
		setModal({
			visible: true,
			comics
		})
	}

	const { currPage, loading } = paginationSelector
	const classes = useStyles()
	const { Search } = Input
	const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />
	return (
		<>
			<Paper className={classes.root}>
				<Search
					className="seach"
					placeholder="Search Comics"
					style={{ width: 200 }}
					enterButton
					onSearch={value => {
						if (value === '') {
							getComics()
						} else {
							searchComics(value)
						}
					}}
				/>
				<div className="group">
					<Spin indicator={antIcon} spinning={loading}>
						{currPage &&
							<>
								<div className="grid">
									{currPage.data.map(comics =>
										<div className="item"
											key={comics.id}
											onClick={() => {
												showModal(comics)
												console.log(modal)
											}}
										>
											<p className="title">{comics.title}</p>
											<img src={`${comics.thumbnail.path}/portrait_fantastic.${comics.thumbnail.extension}`} />
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
				onCancel={() => setModal({ visible: false, comics: [] })}
				visible={modal.visible}
				footer={[
					<>
						<Button onClick={() => setModal({ visible: false, comics: [] })}>
							Exit
						</Button>
					</>
				]}
			>
				<h2>{modal.comics.title}</h2>
				<p>{modal.comics.description ? modal.comics.description : "Without description"}</p>
			</Modal>
		</>
	)
}
