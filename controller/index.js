const controller = {
    login: require('./login'),
    account: require('./account'),
    attendance: require('./attendance'),
    division: require('./division'),
    schedule: require('./schedule'),
    shifting: require('./shifting'),
    shift_turn: require('./shift_turn'),
    shift_type: require('./shift_type'),
    account_level: require('./account_level'),
    account_device: require('./account_device'),
    locator: require('./locator'),
    cuti_request: require('./cuti_request'),
    cuti_type: require('./cuti_type'),
    dashboard: require('./dashboard'),
    forget_password: require('./forget_password'),
    profile: require('./profile'),
    role: require('./role'),
    
    m_dashboard: require('./m_dashboard'),
    m_attendance: require('./m_attendance'),
};

module.exports = controller;
