import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
	AppBar,
	Avatar,
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	Stack,
	Toolbar,
} from '@mui/material'
import {
	AssignmentIndOutlined,
	MailOutline,
	Menu as MenuIcon,
	PersonOutline,
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'

import { profilePropTypes, defaultProfilePropTypes } from '../../../auth/profile.proptypes'

import * as styles from './layout.styles'

/**
 * Layout template
 */
const LayoutTemplate = ({ profile, onLogoutClick }) => {
	return (
		<Box component='div' sx={styles.root}>
			<Box sx={styles.appToolbar}>
				<AppToolbar profile={profile} onLogoutClick={onLogoutClick} />
			</Box>
			<Box sx={styles.main}>
				<Outlet />
			</Box>
		</Box>
	)
}
LayoutTemplate.propTypes = profilePropTypes
LayoutTemplate.defaultProps = defaultProfilePropTypes


/**
 * App toolbar template
 */
const AppToolbar = ({ profile, onLogoutClick }) => {
	const { t } = useTranslation()
	const [profileAnchorEl, setProfileAnchorEl] = useState(null)

	const isProfileMenuOpen = Boolean(profileAnchorEl)

	return (
		<AppBar>
			<Toolbar>
				<IconButton color='inherit'>
					<MenuIcon />
				</IconButton>
				<Box sx={styles.appToolbar.space} />
				<IconButton onClick={(event) => setProfileAnchorEl(event.currentTarget)}>
					<Avatar src={profile.avatar_url} />
				</IconButton>
				<CustomizedMenu
					id='profile-menu'
					anchorEl={profileAnchorEl}
					open={isProfileMenuOpen}
					onClose={() => setProfileAnchorEl(null)}
				>
					<Box>
						<Stack>
							<List>
								<ListItem>
									<ListItemIcon>
										<PersonOutline />
									</ListItemIcon>
									<ListItemText primary={profile.name} />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<AssignmentIndOutlined />
									</ListItemIcon>
									<ListItemText primary={profile.user_name} />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<MailOutline />
									</ListItemIcon>
									<ListItemText primary={profile.email} />
								</ListItem>
							</List>
							<Button onClick={onLogoutClick}>{t('logout', { ns: 'home' })}</Button>
						</Stack>
					</Box>
				</CustomizedMenu>
			</Toolbar>
		</AppBar>
	)
}
AppToolbar.propTypes = profilePropTypes
AppToolbar.defaultProps = defaultProfilePropTypes

const CustomizedMenu = styled(Menu)`
	& .MuiMenu-list {
		padding: 0px;
	}
`

export default LayoutTemplate
