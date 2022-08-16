import React from 'react'
import { Layout, Button } from 'antd'
import { MenuOutlined, SearchOutlined, BellOutlined, DownOutlined } from '@ant-design/icons'

const { Header } = Layout

export const withHeader = (WrappedComponent, title = 'Clinical Notes') =>
  (props) => {
    return (
      <Layout>
        <Header>
          <div className='navbar d-flex space-between'>
            <span className='menu-toggle'>
              <MenuOutlined />
              <span className='title'>{title}</span>
            </span>

            <div className='right d-flex align-center'>
              <Button type="default" icon={<SearchOutlined />} />
              <Button type="default" icon={<BellOutlined />} />
              <div className='user-info'>
                <span className='user-name'>Hello, <b>Fluffykins</b></span>
                <img src='https://catsonmymind.com/wp-content/uploads/2021/12/Tuxedo-Cat-Weight-Feature.jpg' alt='user-ava' className='user-ava' />
              </div>
              <span className='more'><DownOutlined /></span>
            </div>
          </div>
        </Header>

        <Layout>
          <WrappedComponent {...props} />
        </Layout>
      </Layout>
    )
  }
