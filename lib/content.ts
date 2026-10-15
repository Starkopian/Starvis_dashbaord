export const modules = [
  {
    id: 'music',
    name: 'Music, without missing a beat.',
    short: 'Music',
    tag: 'THE SOUND OF YOUR SERVER',
    description:
      'A shared soundtrack with playlists, queue controls, repeat, shuffle and an AI DJ command interface.',
    href: '/features/music',
    icon: 'music',
    commands: ['play', 'queue', 'shuffle'],
  },
  {
    id: 'security',
    name: 'Good vibes. Strong boundaries.',
    short: 'Security',
    tag: 'PEACE OF MIND, BUILT IN',
    description:
      'Instant AutoMod rules, message cleanup, verification and anti-nuke controls. Your rules, with clear audit trails.',
    href: '/features/security',
    icon: 'shield',
    commands: ['moderation', 'automod', 'antinuke'],
  },
  {
    id: 'community',
    name: 'Give everyone a reason to stay.',
    short: 'Community',
    tag: 'MAKE IT FEEL LIKE HOME',
    description:
      'Celebrate birthdays and festivals, chat with STARVIS AI, organize roles and create temporary voice rooms.',
    href: '/features/community',
    icon: 'users',
    commands: ['birthday', 'aichat', 'set'],
  },
] as const;
export const docs = [
  {
    id: 'birthdays',
    title: 'Celebrate member birthdays',
    category: 'Community',
    text: 'Use /birthday set to save your birthday, /birthday view to check a member, /birthday list for upcoming celebrations, and /birthday remove to remove your entry. Administrators with Manage Server can use /birthday channel to select an announcement channel and optional birthday role, /birthday test to preview a card in Discord, and /birthday disable to stop announcements. Gemini greetings depend on provider configuration; fallback greetings are available.',
  },
  {
    id: 'festivals',
    title: 'Festival announcements',
    category: 'Community',
    text: 'Use /setfest to configure festival announcements and their destination in Discord. STARVIS uses its built-in festival calendar and can generate greetings with Gemini. Review the available calendar and server settings before enabling announcements.',
  },
  {
    id: 'ai-chat',
    title: 'Ask STARVIS or create an AI lounge',
    category: 'Community',
    text: 'Use /ask for a question, or /aichat channel to choose an automatic conversation channel and personality. /aichat status shows the configuration and /aichat disable stops automatic responses. Lounge setup requires Manage Server. Gemini requires provider configuration; fallback replies are available. AI lounge responses do not trigger mentions.',
  },
  {
    id: 'bulk-roles',
    title: 'Roles for humans, bots or everyone',
    category: 'Community',
    text: '/set role supports adding or removing a role for humans, bots or everyone; /set all is an alias. Bulk jobs use paced batches, progress updates and a server cooldown. STARVIS checks role safety and hierarchy and reports individual failures. /set panel publishes a button so members can claim a role themselves. Setup requires Manage Roles.',
  },
  {
    id: 'start',
    title: 'Your first five minutes',
    category: 'Getting started',
    text: 'Invite STARVIS with the Add to Discord button, choose a server you manage, and review the requested permissions. Start with /help to discover the command panels available in your installation. Enable only the modules your community needs.',
  },
  {
    id: 'permissions',
    title: 'Permissions & role hierarchy',
    category: 'Safety',
    text: 'This public website does not require a login or access server membership. Bot installation happens on Discord. Role, moderation and security modules need additional permissions granted deliberately by a server administrator. Put the STARVIS role above the roles it manages. It cannot manage the server owner or roles at or above its highest role.',
  },
  {
    id: 'music',
    title: 'Start a listening session',
    category: 'Music',
    text: 'Join a voice channel, then use /play with a search or supported link. Use /queue to inspect upcoming tracks and the native controller for playback. Playlist availability, region restrictions and upstream audio providers can affect results. The website player is a silent simulation and never connects to your server.',
  },
  {
    id: 'verification',
    title: 'Choose a verification method',
    category: 'Security',
    text: 'STARVIS supports button, image CAPTCHA, password and web verification flows. Configure the verified role, optional unverified role, channel and security thresholds before enabling the gate. Verify bot role hierarchy and test with a non-admin account. Web verification requires its own configured public endpoint; this marketing website does not replace it.',
  },
  {
    id: 'moderation',
    title: 'Moderation & private logs',
    category: 'Security',
    text: 'Use /automod config for thresholds and actions, /automod words for word filters, /automod links for domain policies, and /automod exempt for exemptions. /clear removes up to 100 recent messages with an optional member filter; bulk deletion skips messages older than 14 days. /logsetup provisions sectioned logs. Review administrator-only access. AI-assisted detection depends on configured providers and cannot guarantee every scam is detected.',
  },
  {
    id: 'voice',
    title: 'Join-to-create voice rooms',
    category: 'Community',
    text: 'Use /joinvcsetup to provision a voice category and room triggers. Members join a trigger to create a temporary room and receive owner controls. The bot needs channel management, movement and voice permissions. Empty room cleanup and room ownership are handled by the bot, not this website demo.',
  },
  {
    id: 'alerts',
    title: 'Creator notifications',
    category: 'Community',
    text: 'The notifier setup panel manages supported creator sources such as YouTube, Twitch and Kick. Actual provider support and credentials are specific to the bot installation. Check configured polling, source IDs and destination channel permissions before expecting alerts.',
  },
] as const;
