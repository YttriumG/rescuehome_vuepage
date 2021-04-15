const steps = [
  {
    element: '#user-card',
    popover: {
      title: '管理员基本信息',
      description: '此处可以查看登录者的基本信息',
      position: 'bottom'
    }
  },
  {
    element: '#basic-info',
    popover: {
      title: '搜救基本信息',
      description: '首页展示了昨日新增走势人数，待审批走失人员，成功搜寻人数与在线志愿者人数，更直观地供后台管理人员进行管理与指挥',
      position: 'left'
    }
  },
  {
    element: '#todo',
    popover: {
      title: 'TODO表',
      description: '此处供后台管理人员记录待完成事项，提高工作效率',
      position: 'right'
    }
  },
  {
    element: '#home-map',
    popover: {
      title: '志愿者位置信息',
      description: '地图标出了当前在线志愿者的位置信息，供后台指挥使用',
      position: 'top'
    }
  },
  {
    element: '#user-avator',
    popover: {
      title: '用户个人信息修改',
      description: '此处可以更改用户个人信息',
      position: 'left'
    }
  },
  {
    element: '#sidebar',
    popover: {
      title: '主要管理界面',
      description: '侧边栏提供了人员管理、志愿者管理、小程序账号管理等各类功能，供后台管理人员使用',
      position: 'right'
    },
    padding: 0
  }
]
export default steps
