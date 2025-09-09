import React, { useState } from 'react'
import { NextPage } from 'next'

// ** MUI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

// ** Components
import IconifyIcon from 'src/components/Icon'

// ** Config
import { VerticalItems } from 'src/configs/layout'

type TProps = {}

const RecursiveListItems = ({ items, level }: { items: any; level: number }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const handleClick = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <>
      {items?.map((item: any) => (
        <React.Fragment key={item.title}>
          <ListItemButton
            sx={{
              paddingLeft: `${level * 20}px`
            }}
            onClick={() => {
              if (item.childrens) {
                handleClick(item.title)
              }
            }}
          >
            {/* Icon bên trái */}
            {item.icon && (
              <ListItemIcon>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
            )}

            {/* Text */}
            <ListItemText primary={item?.title} />

            {/* Nếu có childrens thì hiển thị icon toggle */}
            {item.childrens &&
              item.childrens.length > 0 &&
              (openItems[item.title] ? (
                <IconifyIcon icon='ic:twotone-expand-less' style={{ transform: 'rotate(180deg)' }} />
              ) : (
                <IconifyIcon icon='ic:twotone-expand-less' />
              ))}
          </ListItemButton>

          {/* Sub menu */}
          {item.childrens && item.childrens.length > 0 && (
            <Collapse in={openItems[item.title]} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <RecursiveListItems items={item.childrens} level={level + 1} />
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

const VerticalList: NextPage<TProps> = () => {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper'
      }}
      component='nav'
      aria-labelledby='nested-list-subheader'
    >
      <RecursiveListItems items={VerticalItems} level={1} />
    </List>
  )
}

export default VerticalList
