export const nips = [
  {
    number: "01",
    title: "Basic Protocol",
    summary:
      'NIP-01 defines the basic protocol for the Nostr network. It specifies that events are the only object type, and that signatures, public keys, and encodings should be done according to the Schnorr signatures standard for the curve secp256k1. The format for events on the wire is also outlined, including the fields for "id," "pubkey," "created_at," "kind," "tags," "content," and "sig." Communication between clients and relays is done through websocket endpoints, with clients being able to send 3 types of messages: "EVENT" to publish events, "REQ" to request events and subscribe to new updates, and "CLOSE" to stop previous subscriptions. The relay should store the filter received by REQ message and send back all future events it receives to the same websocket until the websocket is closed.',
    bullets: [
      "Events are the only object type",
      "Signatures, public keys, and encodings use Schnorr signatures standard for the curve secp256k1",
      "Communication between clients and relays is done through websocket endpoints",
    ],
  },
  {
    number: "02",
    title: "Contact List And Pet Names",
    summary:
      'NIP-02 defines a special event with kind 3, which is used for contact lists, and includes a list of p tags, one for each of the followed/known profiles that a user is following. The contact list event should contain the key for the profile, a relay URL where events from that key can be found and a local name for that profile, allowing clients to display a list of followed people by profiles, making lists of suggestions on who to follow based on the contact lists of other people, or showing the data in other contexts. Contact lists can also be used for backup and relay sharing. Additionally, petname scheme is introduced, which allows clients to construct local "petname" tables derived from other people\'s contact lists and show human-readable names instead of keys.',
    bullets: [
      "Special event kind 3 for contact lists",
      "Petname scheme allows clients to construct local 'petname' tables derived from other people's contact lists",
      "Contact lists can be used for backup and relay sharing",
    ],
  },
  {
    number: "03",
    title: "OpenTimestamps Attestations For Events",
    summary:
      'NIP-03 is a proposed modification to the Nostr protocol that allows for the use of OpenTimestamps (OTS) attestations in events. The OTS is a timestamping service that allows to prove that a certain piece of data existed at a certain point in time. An OTS timestamp is included in an event by adding the "ots" field which contains the base64-encoded OTS file data. The event\'s id is used as the raw hash to be included in the OpenTimestamps merkle tree. The attestation can be provided by relays automatically or by clients themselves when the event is first uploaded to relays. The OTS timestamp can be used by clients to show that an event is "at least as old as [OTS date]" and provide proof of the data\'s existence at that time.',
    bullets: [
      "Use of OpenTimestamps (OTS) attestations in events",
      "OTS timestamp is included in an event by adding the 'ots' field which contains the base64-encoded OTS file data",
      "OTS timestamp can be used by clients to show that an event is 'at least as old as [OTS date]' and provide proof of the data's existence at that time",
    ],
  },
  {
    number: "04",
    title: "Encrypted Direct Message",
    summary:
      'NIP-04 is a proposal for a special type of event called an "encrypted direct message" which allows for private communication between two users. This event type is identified by having a kind of 4. The "content" field of this event is an encrypted message that is only viewable by the intended recipient, who can use their own key to decrypt it. The event also has "tags" field that contains the public key of the recipient, so that the relay servers know where to forward the message to. Additionally, it may contain an entry identifying the event in a previous conversation, to organize the conversations in a more contextually.',
    bullets: [
      "Special type of event called an 'encrypted direct message' which allows for private communication between two users",
      "The 'content' field is an encrypted message that is only viewable by the intended recipient",
      "The event also has 'tags' field that contains the public key of the recipient, so that the relay servers know where to forward the message to",
    ],
  },
  {
    number: "05",
    title: "Mapping Nostr Keys To DNS-Based Internet Identifiers",
    summary:
      "NIP-05 is a way for people to link their public keys, used in the Nostr protocol, to an internet identifier such as an email address. This allows users to easily find and identify other users based on their internet identifier rather than their public key. The association of a public key to an internet identifier is done through the publication of a special event, with the public key and the internet identifier included in the content. The clients or users can check the association of the identifier to the public key by making a request to a specific URL associated with the domain of the internet identifier, which should return the names and their corresponding public keys.",
    bullets: [
      "Linking of public keys used in the Nostr protocol to an internet identifier such as an email address",
      "Association of a public key to an internet identifier is done through the publication of a special event",
      "Clients can query for events with the given internet identifier to find the associated public key",
    ],
  },
  {
    number: "06",
    title: "Basic Key Derivation From Mnemonic Seed Phrase",
    summary:
      "NIP-06 defines how mnemonic seed phrases should be used to generate keys for a client in the Nostr network. BIP39 is used to create a set of mnemonic words that can be used to create a binary seed. BIP32 is then used to derive a key from the seed using a specific path, m/44'/1237'/0'/0/0. This is the default method for creating keys for a single-key client, but other types of clients can use different derivation paths if they want to.",
    bullets: [
      "BIP39 is used to create a set of mnemonic words to create a binary seed",
      "BIP32 is used to derive a key from the seed using a specific path",
      "Default method is creating keys for single-key client, but other derivation paths can be used",
    ],
  },
  {
    number: "07",
    title: "window.nostr Capability For Web Browsers",
    summary:
      "NIP-07 suggests the implementation of a window.nostr object that can be used by web browsers or extensions to access and utilize the functionality of the Nostr protocol. The window.nostr object must have at least two methods, one for getting the public key and another for signing an event. Additionally, there are optional methods that could be implemented such as getting the relays, encrypting and decrypting messages using the NIP-04 encryption protocol. This NIP is implemented by existing Chromium extension called nos2x and Bitcoin extension called Alby that provide the same window.nostr capabilities.",
    bullets: [
      "window.nostr object for web browsers and extensions to access Nostr protocol",
      "2 required methods: getting public key and signing event",
      "Optional methods include getting relays, encrypting and decrypting messages",
    ],
  },
  {
    number: "08",
    title: "Handling Mentions",
    summary:
      'NIP-08 standardizes the way mentions of other events and public keys are handled within text_notes. Clients that support mentions should have a way for users to include them, such as an autocomplete feature. Once a mention is made, the client should add the mentioned pubkey or event ID to the event\'s tags and replace the mention in the content with a notation, "#[index]". This allows for clients to easily display the mention with the appropriate context, such as linking to the pubkey or showing a preview of the event contents that was mentioned.',
    bullets: [
      "Standardizes mentions of other events and public keys in text notes",
      "Clients should have a way to include mentions, such as autocomplete",
      "Mentions are added to the event's tags and replaced in the content with a notation for easy display",
    ],
  },
  {
    number: "09",
    title: "Event Deletion",
    summary:
      'NIP-09 defines a special event type called "deletion" which can be used to request that previous events be removed from circulation. This event has a "kind" value of 5 and contains one or more "e" tags, each referencing a specific event id that the author of the deletion event wants to delete. The content field of the deletion event may also contain a text note explaining the reason for the deletion. Relays should stop publishing any events that are referenced in the deletion event if the pubkey of the deletion event matches that of the events to be deleted. Clients should hide or indicate that the events are deleted and deletion events should be published indefinitely so that clients that have already received the events to be deleted can also be informed. Clients should validate that the pubkey of the deletion event matches that of the events to be deleted before hiding or deleting the events. Relays are not obligated to perform this validation and should not be treated as authoritative. The functionality to "undelete" is not required or supported.',
    bullets: [
      "Defines a special event type called 'deletion' to remove previous events",
      "Relays should stop publishing events referenced in the deletion event if pubkey match",
      "Clients should hide or indicate deleted events, deletion event should be published indefinitely",
    ],
  },
  {
    number: "10",
    title: `On "e" And "p" Tags In Text Events (kind 1)`,
    summary:
      'NIP-10 describes how to use "e" and "p" tags in text events, specifically how to thread replies into a tree rooted at the original event. The use of positional "e" tags is deprecated as it creates ambiguities, instead clients should use marked "e" tags which include a marker that denotes whether it is a "reply" or "root" id. The "p" tag is used to record the pubkeys of who is involved in a reply thread, and when replying to a text event, the reply event\'s "p" tags should contain all of the original event\'s "p" tags as well as the pubkey of the event being replied to.',
    bullets: [
      'Deprecates use of positional "e" tags in favor of marked "e" tags',
      'Marked "e" tags include a marker that denotes whether it is a "reply" or "root" id',
      'The "p" tag is used to record the pubkeys of who is involved in a reply thread',
    ],
  },
  {
    number: "11",
    title: "Relay Information Document",
    summary:
      "NIP-11 defines a standard for relays to provide server metadata to clients in the form of a JSON document available over HTTP on the same URI as the relay's websocket. The JSON document includes fields for name, description, pubkey, contact, supported NIPs, software, and version. Relays are expected to accept CORS requests and may include a pubkey for administrative contact, an alternative contact for communication, and a list of NIPs that are supported by the relay. Additionally, the software and version of the relay can be included. The goal of this NIP is to allow clients to easily determine the capabilities, administrative contacts, and various attributes of a relay.",
    bullets: [
      "NIP-11 defines a standard for relays to provide server metadata to clients in the form of a JSON document available over HTTP.",
      "The JSON document includes fields for name, description, pubkey, contact, supported NIPs, software, and version.",
      "The goal of this NIP is to allow clients to easily determine the capabilities, administrative contacts, and various attributes of a relay.",
    ],
  },
  {
    number: "12",
    title: "Generic Tag Queries",
    summary:
      'NIP-12 describes the implementation of generic tag queries in relays, which allows clients to subscribe to events with arbitrary tags. It expands the &lt;filters&gt; object in NIP-01 to contain keys starting with "#" for tag queries, and allows for any single-letter key to be used as a tag name. The filter condition matches if the event has a tag with the same name and there is at least one tag value in common with the filter and event. Clients should use the supported_nips field to check if a relay supports this feature, and may send generic tag queries to any relay but they should be prepared to filter out extraneous responses from relays that do not support this NIP. This NIP suggests a few use cases such as decentralized commenting system, location-specific posts and hashtags.',
    bullets: [
      "NIP-12 enables generic tag queries for event subscriptions",
      "Expands NIP-01 filters to include keys starting with '#' for tag queries",
      "Clients check supported_nips field before using feature, may filter extraneous responses from unsupported relays",
    ],
  },
  {
    number: "13",
    title: "Proof of Work",
    summary:
      "NIP-13 defines a Proof of Work (PoW) mechanism for Nostr notes as a way to add a proof of computational work to a note, and it can be used as a means of spam deterrence. PoW is generated by using a nonce tag, which is updated and the note's id is recalculated until the desired number of leading zero bits are achieved. The target difficulty is also included in the nonce tag, allowing clients to protect against situations where bulk spammers targeting a lower difficulty get lucky and match a higher difficulty. The code for calculating the difficulty in a Nostr note id is provided as reference. Additionally, the NIP also describes a concept called Delegated Proof of Work, in which PoW can be outsourced to PoW providers for a fee.",
    bullets: [
      "NIP-13 defines Proof of Work (PoW) for Nostr notes as spam deterrence",
      "PoW generated by nonce tag, recalculating note's id to match target difficulty",
      "Delegated Proof of Work allows outsourcing PoW to providers for a fee",
    ],
  },
  {
    number: "14",
    title: "Subject Tag In Text Events",
    summary:
      'NIP-14 defines the use of the "subject" tag in text (kind: 1) events, to improve the way clients thread and display messages in a conversation. The subject tag is a string that can be used in a list of messages instead of using the first few words of the message as the title. The contents of the subject tag can be replicated when replying to a message, with clients may adorn the subject with "Re:" to denote that it is a reply. The recommended length for the subject string is less than 80 characters.',
    bullets: [
      "NIP-14 defines the use of the subject tag in text events",
      "The subject tag improves threading and display of messages",
      "The recommended length for the subject string is less than 80 characters",
    ],
  },
  {
    number: "15",
    title: "End Of Stored Events Notice",
    summary:
      'In summary, NIP-15 suggests that relays may send a message "EOSE" to clients, indicating that all stored events have been sent and any new events that come after that message are newly published. This allows clients to better handle the flow of events and reduce uncertainty around when all events have been received. This feature can be supported by relays, and clients should use the "supported_nips" field to check if a relay supports this feature before making use of it.',
    bullets: [
      "NIP-15 suggests relays may send 'EOSE' message to indicate all stored events have been sent.",
      "This allows clients to better handle the flow of events and reduce uncertainty.",
      "Clients should check 'supported_nips' field to see if relay supports this feature.",
    ],
  },
  {
    number: "16",
    title: "Event Treatment",
    summary:
      'NIP-16, named "Event Treatment" defines a way for relays to handle different types of events: regular, replaceable, and ephemeral events. Regular events are events with a kind between 1000 and 9999, and upon receiving them, relays should send them to all clients with matching filters and also store them. Replaceable events are events with a kind between 10000 and 19999, which upon receiving, the relay should check if the event has a newer timestamp than the previous event with the same kind, and signed by the same key, then the old event should be discarded and replaced with the newer event. Lastly, Ephemeral events are events with a kind between 20000 and 29999, upon receiving them, the relay should send them to all clients with matching filters and they must not store them. Clients are expected to check the supported_nips field to see if the relay supports this NIP.',
    bullets: [
      "NIP-16 defines a way for relays to handle different types of events: regular, replaceable, and ephemeral.",
      "Regular events are events with a kind between 1000 and 9999, and upon receiving them, relays should send them to all clients with matching filters and also store them.",
      "Clients are expected to check the supported_nips field to see if the relay supports this NIP.",
    ],
  },
  {
    number: "19",
    title: "bech32-Encoded Entities",
    summary:
      'NIP-19 describes a standard for encoding keys, ids, and other information in bech32 format. This format is intended for human-friendly display and input, and not for use within the core Nostr protocol. It suggests using different prefixes for different types of entities: "npub" for public keys, "nsec" for private keys, and "note" for note ids. The proposal also describes a way to share identifiers with additional metadata, using a binary-encoded list of TLV (type-length-value) structures, and suggests prefixes such as "nprofile" for profiles and "nevent" for events. It also clarifies that, while bech32 keys can be used in the display and input, they should not be used in NIP-01 events, only the hex format is supported there.',
    bullets: [
      "NIP-19 defines a standard for encoding keys, ids and other information in bech32 format for human-friendly display and input",
      "It suggests using different prefixes for different types of entities: npub for public keys, nsec for private keys and note for note ids",
      "It also clarifies that bech32 keys should not be used in NIP-01 events, only the hex format is supported there",
    ],
  },
  {
    number: "20",
    title: "Command Results",
    summary:
      'NIP-20 proposes a way for clients to know if an event they submit to a relay is successfully committed to the database or not. It suggests that relays should use a JSON object, called a "command result," to provide clients with more information about whether an event was accepted or rejected. The command result is in the format of ["OK", &lt;event_id&gt;, &lt;true|false&gt;, &lt;message&gt;], where "OK" denotes the command result, &lt;event_id&gt; is the event id, &lt;true|false&gt; is the acceptance or rejection of the event, and &lt;message&gt; is a string that provides additional information on why the command succeeded or failed. The message may start with "duplicate:" if the event was a duplicate and has already been saved, "blocked:" if the pubkey or network address has been blocked, "invalid:" if the event is invalid or doesn\'t meet some specific criteria, "pow:" if the event doesn\'t meet some proof-of-work difficulty, "rate-limited:" if the event was rejected due to rate limiting techniques, and "error:" if the event failed to save due to a server issue.',
    bullets: [
      "NIP-20 proposes a way for clients to know if an event they submit to a relay is successfully committed to the database or not.",
      "It suggests that relays should use a JSON object, called a 'command result' to provide clients with more information about whether an event was accepted or rejected.",
      "The command result includes information like event_id, acceptance or rejection, and message that provides additional information on why the command succeeded or failed.",
    ],
  },
  {
    number: "22",
    title: "Event created_at Limits",
    summary:
      "NIP-22 proposes a way for relays to define both upper and lower limits within which they will consider an event's created_at timestamp to be acceptable. This is to ensure that events with timestamps that are too far in the past or future are not stored by the relay. The proposal suggests that relays should communicate these limits to clients using the NIP-20 command result, indicating that the event was not stored due to the timestamp not being within the permitted limits. The motivation for this NIP is to create a better user experience by reducing the number of events that appear out of order or from impossible dates in the distant past or future. It also allows clients to be aware of the limits that the relay has set and adjust accordingly, but it is important to keep in mind that it could also not permit older events to be migrated to new relays.",
    bullets: [
      "NIP-22: defines upper and lower limits for event timestamps to be stored by relay.",
      "Limits communicated to clients using NIP-20 command result.",
      "Improves user experience and allows clients to adjust accordingly, but could also block older events from being migrated.",
    ],
  },
  {
    number: "25",
    title: "Reactions",
    summary:
      'A reaction is a kind 7 note in the nostr protocol that allows users to react to other notes. This NIP defines the behavior for reactions, which includes the content of the reaction and the tags that should be included. The content of a reaction can be set to "+" to indicate a "like" or "upvote", "-" to indicate a "dislike" or "downvote", or an emoji, which can be interpreted as a "like" or "dislike" or displayed as an emoji reaction on a post. The reaction event should include "e" and "p" tags from the note that the user is reacting to, which allows users to be notified of reactions to posts they were mentioned in and allows clients to pull all the reactions associated with individual posts or all the posts in a thread. The last "e" tag must be the id of the note that is being reacted to and the last "p" tag must be the pubkey of the event being reacted to. This NIP is optional, so it\'s up to relay operator to choose whether they want to support it or not.',
    bullets: [
      "NIP-25 defines a way for users to react to other notes through a 'kind 7' note in the Nostr protocol.",
      "It specifies the content of the reaction and the tags that should be included in the reaction event.",
      "It also states that the reaction event should include 'e' and 'p' tags from the note being reacted to and it's optional for relay operators to support it.",
    ],
  },
  {
    number: "26",
    title: "Delegated Event Signing",
    summary:
      "NIP-26, \"Delegated Event Signing\" introduces a new 'delegation' tag which allows events to be signed by other keypairs. It allows users to grant authorizations to other keypairs, making it easier for them to manage different keys for different clients, while keeping their 'root' keypairs in cold storage. It also allows relays to abstract away the use of 'root' keypairs when interacting with clients.",
    bullets: [
      "NIP-26 introduces 'delegation' tag for signed by other keypairs.",
      "Allows users to manage different keys for different clients, while keeping their 'root' keypairs in cold storage.",
      "Allows relays to abstract away the use of 'root' keypairs when interacting with clients.",
    ],
  },
  {
    number: "28",
    title: "Public Chat",
    summary:
      'NIP-28, "Public Chat" defines new event kinds for public chat channels, channel messages, and basic client-side moderation. It reserves five event kinds for immediate use and five event kinds for future use. The proposed event kinds include: creating channels (40), setting channel metadata (41), creating channel messages (42), hiding messages (43), muting users (44) among others. The NIP also suggests the usage of NIP-10 for relay recommendations.',
    bullets: [
      "NIP-28 defines new event kinds for public chat channels, messages, and moderation",
      "Proposes five event kinds for immediate use and five for future use",
      "Suggests usage of NIP-10 for relay recommendations",
    ],
  },
  {
    number: "33",
    title: "Parameterized Replaceable Events",
    summary:
      'NIP-33 provides a way to replace events based on a new "d" tag, it defines a new range of event kinds (30000 &lt;= n &lt; 40000) where the events can be replaced, it allows replacement of events that have the same d tag and kind unlike NIP-16, it discards the old event with a newer event that shares the same d tag, it allows to use events from the same author with any of the following tags. This can be useful for updating information, deleting post, and editing post among others.',
    bullets: [
      "NIP-33 introduces a new 'd' tag for replacing events",
      "New event kinds range defined (30000 &lt;= n &lt; 40000) for replacement events",
      "Allows replacement of events with same 'd' tag and kind, discarding older events",
    ],
  },
  {
    number: "36",
    title: "Sensitive Content / Content Warning",
    summary:
      'NIP-36 introduces the "content-warning" tag that allows users to specify if an event\'s content should be hidden until the reader chooses to view it. The tag can include an optional "reason" field that explains why the content is sensitive. This allows users to flag content that may be disturbing or offensive, and enables clients to implement more robust content moderation features. Clients can use the "content-warning" tag to hide content by default and give the user an option to view it.',
    bullets: [
      "NIP-36 introduces content-warning tag",
      "Allows flagging of disturbing/offensive content",
      "Enables robust content moderation",
    ],
  },
  {
    number: "40",
    title: "Expiration Timestamp",
    summary:
      'NIP-40 is a proposal for a new event tag called "expiration" which allows users to specify a unix timestamp at which the message should be considered expired by relays and clients, and should be deleted by relays. The tag\'s value is a required UNIX timestamp in seconds, which is interpreted as the time at which the message should be deleted by relays. Clients should ignore events that have expired. Relays may not delete an expired message immediately on expiration and may persist them indefinitely, but they should not send expired events to clients, even if they are stored. The suggested use cases of this NIP include temporary announcements and limited-time offers and it is important to note that the events could be downloaded by third parties as they are publicly accessible all the time on the relays.',
    bullets: [
      "NIP-40 introduces 'expiration' tag",
      "Allows users to specify unix timestamp for message deletion by relays",
      "Clients should ignore expired events, relays may persist but not send to clients",
    ],
  },
  {
    number: "42",
    title: "Authentication of Clients to Relays",
    summary:
      'NIP-42 defines a way for clients to authenticate to relays by signing an ephemeral event. The idea is that a relay may want to require clients to authenticate in order to access restricted resources, such as publishing events, accessing private messages, or subscribing to certain types of content. The NIP defines a new message, called "AUTH", which relays can send to clients to request authentication, and which clients can respond to by sending a signed ephemeral event that includes the challenge string sent by the relay. The signed event must be of kind 22242, and must include a "relay" tag with the relay URL and a "challenge" tag with the challenge string. Relays must verify that the event is properly signed, that the kind is 22242, that the created_at timestamp is recent, and that the "challenge" and "relay" tags match the original challenge and relay URL. The authentication is expected to last for the duration of the WebSocket connection and the challenge is expected to be valid for the duration of the connection or until a next challenge is sent by the relay.',
    bullets: [
      "NIP-42 defines authentication for clients via signed ephemeral events",
      'Clients respond to relay\'s "AUTH" request with signed event including challenge string',
      "Relay verifies event signature, kind, timestamp, and challenge/relay tags match",
    ],
  },
];
