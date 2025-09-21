//react
import React, { useEffect, useState } from 'react'
//next
import { NextPage } from 'next'

// ** MUI
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

// ** Components
import IconifyIcon from 'src/components/Icon'

// ** Config
import { VerticalItems } from 'src/configs/layout'

type TProps = {
  open: boolean
}

type ListItems = {
  level: number
  openItem: { [key: string]: boolean }
  items: any
  setOpenItem: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
  disabled: boolean
}

const RecursiveListItems = ({ items, level, disabled, openItem, setOpenItem }: ListItems) => {
  const handleClick = (title: string) => {
    if (!disabled) {
      setOpenItem(prev => ({
        ...prev,
        [title]: !prev[title]
      }))
    }
  }

  return (
    <>
      {items?.map((item: any) => (
        <React.Fragment key={item.title}>
          <ListItemButton
            sx={{ padding: ` 8px 10px 8px ${level * (level === 1 ? 28 : 20)}px` }}
            onClick={() => {
              if (item.childrens) {
                handleClick(item.title)
              }
            }}
            disabled={disabled}
          >
            {/* Icon bên trái */}
            {item.icon && (
              <ListItemIcon>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
            )}

            {/* Text */}
            {!disabled && <ListItemText primary={item.title} />}

            {/* Nếu có childrens thì hiển thị icon toggle */}
            {item.childrens &&
              item.childrens.length > 0 &&
              (openItem[item.title] ? (
                <IconifyIcon icon='ic:twotone-expand-less' />
              ) : (
                <IconifyIcon icon='ic:twotone-expand-more' />
              ))}
          </ListItemButton>

          {/* Sub menu */}
          {item.childrens && item.childrens.length > 0 && (
            <Collapse in={openItem[item.title]} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <RecursiveListItems
                  items={item.childrens}
                  level={level + 1}
                  disabled={disabled}
                  openItem={openItem}
                  setOpenItem={setOpenItem}
                />
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

const VerticalList: NextPage<TProps> = ({ open }) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (!open) {
      handleAllToggle()
    }
  }, [open])

  const handleAllToggle = () => {
    setOpenItems({})
  }

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
      <RecursiveListItems
        items={VerticalItems}
        level={1}
        disabled={!open}
        openItem={openItems}
        setOpenItem={setOpenItems}
      />
    </List>
  )
}

export default VerticalList
