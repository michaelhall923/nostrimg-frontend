/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Helmet } from "react-helmet-async";
import { RiGithubFill } from "react-icons/ri";
import Header from "../Components/Header";

const nipsStyle = css`
  color: white;
  font-weight: bold;
  color: rgb(196, 181, 253);
  h1 {
    margin-top: 4rem;
    font-size: 4rem;
    color: white;
  }
  h2 {
    margin-top: 2rem;
    font-size: 2rem;
    color: white;
  }
  h3 {
    font-size: 1rem;
    color: white;
  }
`;

function Nips() {
  return (
    <div>
      <Helmet>
        <title>NIPs | Nostrimg</title>
      </Helmet>
      <Header />
      <div className={`max-w-3xl m-auto px-4 mb-8`} css={nipsStyle}>
        <h1>NIPs</h1>
        <a href="https://github.com/nostr-protocol/nips">
          <h3>
            View The Full NIPs On Github{" "}
            <RiGithubFill
              css={{
                display: "inline",
              }}
            />
          </h3>
        </a>
        <h2>NIP-01</h2>
        <h3>Basic Protocol</h3>
        <p>
          NIP-01 defines the basic protocol for the Nostr network. It specifies
          that events are the only object type, and that signatures, public
          keys, and encodings should be done according to the Schnorr signatures
          standard for the curve secp256k1. The format for events on the wire is
          also outlined, including the fields for "id," "pubkey," "created_at,"
          "kind," "tags," "content," and "sig." Communication between clients
          and relays is done through websocket endpoints, with clients being
          able to send 3 types of messages: "EVENT" to publish events, "REQ" to
          request events and subscribe to new updates, and "CLOSE" to stop
          previous subscriptions. The relay should store the filter received by
          REQ message and send back all future events it receives to the same
          websocket until the websocket is closed.
        </p>

        <h2>NIP-02</h2>
        <h3>Contact List And Pet Names</h3>
        <p>
          NIP-02 defines a special event with kind 3, which is used for contact
          lists, and includes a list of p tags, one for each of the
          followed/known profiles that a user is following. The contact list
          event should contain the key for the profile, a relay URL where events
          from that key can be found and a local name for that profile, allowing
          clients to display a list of followed people by profiles, making lists
          of suggestions on who to follow based on the contact lists of other
          people, or showing the data in other contexts. Contact lists can also
          be used for backup and relay sharing. Additionally, petname scheme is
          introduced, which allows clients to construct local "petname" tables
          derived from other people's contact lists and show human-readable
          names instead of keys.
        </p>

        <h2>NIP-03</h2>
        <h3>OpenTimestamps Attestations For Events</h3>
        <p>
          NIP-03 is a proposed modification to the Nostr protocol that allows
          for the use of OpenTimestamps (OTS) attestations in events. The OTS is
          a timestamping service that allows to prove that a certain piece of
          data existed at a certain point in time. An OTS timestamp is included
          in an event by adding the "ots" field which contains the
          base64-encoded OTS file data. The event's id is used as the raw hash
          to be included in the OpenTimestamps merkle tree. The attestation can
          be provided by relays automatically or by clients themselves when the
          event is first uploaded to relays. The OTS timestamp can be used by
          clients to show that an event is "at least as old as [OTS date]" and
          provide proof of the data's existence at that time.
        </p>

        <h2>NIP-04</h2>
        <h3>Encrypted Direct Message</h3>
        <p>
          NIP-04 is a proposal for a special type of event called an "encrypted
          direct message" which allows for private communication between two
          users. This event type is identified by having a kind of 4. The
          "content" field of this event is an encrypted message that is only
          viewable by the intended recipient, who can use their own key to
          decrypt it. The event also has "tags" field that contains the public
          key of the recipient, so that the relay servers know where to forward
          the message to. Additionally, it may contain an entry identifying the
          event in a previous conversation, to organize the conversations in a
          more contextually.
        </p>

        <h2>NIP-05</h2>
        <h3>Mapping Nostr Keys To DNS-Based Internet Identifiers</h3>
        <p>
          NIP-05 is a way for people to link their public keys, used in the
          Nostr protocol, to an internet identifier such as an email address.
          This allows users to easily find and identify other users based on
          their internet identifier rather than their public key. The
          association of a public key to an internet identifier is done through
          the publication of a special event, with the public key and the
          internet identifier included in the content. The clients or users can
          check the association of the identifier to the public key by making a
          request to a specific URL associated with the domain of the internet
          identifier, which should return the names and their corresponding
          public keys.
        </p>

        <h2>NIP-06</h2>
        <h3>Basic Key Derivation From Mnemonic Seed Phrase</h3>
        <p>
          NIP-06 defines how mnemonic seed phrases should be used to generate
          keys for a client in the Nostr network. BIP39 is used to create a set
          of mnemonic words that can be used to create a binary seed. BIP32 is
          then used to derive a key from the seed using a specific path,
          m/44'/1237'/0'/0/0. This is the default method for creating keys for a
          single-key client, but other types of clients can use different
          derivation paths if they want to.
        </p>

        <h2>NIP-07</h2>
        <h3>window.nostr Capability For Web Browsers</h3>
        <p>
          NIP-07 suggests the implementation of a window.nostr object that can
          be used by web browsers or extensions to access and utilize the
          functionality of the Nostr protocol. The window.nostr object must have
          at least two methods, one for getting the public key and another for
          signing an event. Additionally, there are optional methods that could
          be implemented such as getting the relays, encrypting and decrypting
          messages using the NIP-04 encryption protocol. This NIP is implemented
          by existing Chromium extension called nos2x and Bitcoin extension
          called Alby that provide the same window.nostr capabilities.
        </p>

        <h2>NIP-08</h2>
        <h3>Handling Mentions</h3>
        <p>
          NIP-08 standardizes the way mentions of other events and public keys
          are handled within text_notes. Clients that support mentions should
          have a way for users to include them, such as an autocomplete feature.
          Once a mention is made, the client should add the mentioned pubkey or
          event ID to the event's tags and replace the mention in the content
          with a notation, "#[index]". This allows for clients to easily display
          the mention with the appropriate context, such as linking to the
          pubkey or showing a preview of the event contents that was mentioned.
        </p>

        <h2>NIP-09</h2>
        <h3>Event Deletion</h3>
        <p>
          NIP-09 defines a special event type called "deletion" which can be
          used to request that previous events be removed from circulation. This
          event has a "kind" value of 5 and contains one or more "e" tags, each
          referencing a specific event id that the author of the deletion event
          wants to delete. The content field of the deletion event may also
          contain a text note explaining the reason for the deletion. Relays
          should stop publishing any events that are referenced in the deletion
          event if the pubkey of the deletion event matches that of the events
          to be deleted. Clients should hide or indicate that the events are
          deleted and deletion events should be published indefinitely so that
          clients that have already received the events to be deleted can also
          be informed. Clients should validate that the pubkey of the deletion
          event matches that of the events to be deleted before hiding or
          deleting the events. Relays are not obligated to perform this
          validation and should not be treated as authoritative. The
          functionality to "undelete" is not required or supported.
        </p>

        <h2>NIP-10</h2>
        <h3>On "e" And "p" Tags In Text Events (kind 1).</h3>
        <p>
          NIP-10 describes how to use "e" and "p" tags in text events,
          specifically how to thread replies into a tree rooted at the original
          event. The use of positional "e" tags is deprecated as it creates
          ambiguities, instead clients should use marked "e" tags which include
          a marker that denotes whether it is a "reply" or "root" id. The "p"
          tag is used to record the pubkeys of who is involved in a reply
          thread, and when replying to a text event, the reply event's "p" tags
          should contain all of the original event's "p" tags as well as the
          pubkey of the event being replied to.
        </p>

        <h2>NIP-11</h2>
        <h3>Relay Information Document</h3>
        <p>
          NIP-11 defines a standard for relays to provide server metadata to
          clients in the form of a JSON document available over HTTP on the same
          URI as the relay's websocket. The JSON document includes fields for
          name, description, pubkey, contact, supported NIPs, software, and
          version. Relays are expected to accept CORS requests and may include a
          pubkey for administrative contact, an alternative contact for
          communication, and a list of NIPs that are supported by the relay.
          Additionally, the software and version of the relay can be included.
          The goal of this NIP is to allow clients to easily determine the
          capabilities, administrative contacts, and various attributes of a
          relay.
        </p>

        <h2>NIP-12</h2>
        <h3>Generic Tag Queries</h3>
        <p>
          NIP-12 describes the implementation of generic tag queries in relays,
          which allows clients to subscribe to events with arbitrary tags. It
          expands the &lt;filters&gt; object in NIP-01 to contain keys starting
          with "#" for tag queries, and allows for any single-letter key to be
          used as a tag name. The filter condition matches if the event has a
          tag with the same name and there is at least one tag value in common
          with the filter and event. Clients should use the supported_nips field
          to check if a relay supports this feature, and may send generic tag
          queries to any relay but they should be prepared to filter out
          extraneous responses from relays that do not support this NIP. This
          NIP suggests a few use cases such as decentralized commenting system,
          location-specific posts and hashtags.
        </p>

        <h2>NIP-13</h2>
        <h3>Proof of Work</h3>
        <p>
          NIP-13 defines a Proof of Work (PoW) mechanism for Nostr notes as a
          way to add a proof of computational work to a note, and it can be used
          as a means of spam deterrence. PoW is generated by using a nonce tag,
          which is updated and the note's id is recalculated until the desired
          number of leading zero bits are achieved. The target difficulty is
          also included in the nonce tag, allowing clients to protect against
          situations where bulk spammers targeting a lower difficulty get lucky
          and match a higher difficulty. The code for calculating the difficulty
          in a Nostr note id is provided as reference. Additionally, the NIP
          also describes a concept called Delegated Proof of Work, in which PoW
          can be outsourced to PoW providers for a fee.
        </p>

        <h2>NIP-14</h2>
        <h3>Subject Tag In Text Events</h3>
        <p>
          NIP-14 defines the use of the "subject" tag in text (kind: 1) events,
          to improve the way clients thread and display messages in a
          conversation. The subject tag is a string that can be used in a list
          of messages instead of using the first few words of the message as the
          title. The contents of the subject tag can be replicated when replying
          to a message, with clients may adorn the subject with "Re:" to denote
          that it is a reply. The recommended length for the subject string is
          less than 80 characters.
        </p>

        <h2>NIP-15</h2>
        <h3>End Of Stored Events Notice</h3>
        <p>
          In summary, NIP-15 suggests that relays may send a message "EOSE" to
          clients, indicating that all stored events have been sent and any new
          events that come after that message are newly published. This allows
          clients to better handle the flow of events and reduce uncertainty
          around when all events have been received. This feature can be
          supported by relays, and clients should use the "supported_nips" field
          to check if a relay supports this feature before making use of it.
        </p>

        <h2>NIP-16</h2>
        <h3>Event Treatment</h3>
        <p>
          NIP-16, named "Event Treatment" defines a way for relays to handle
          different types of events: regular, replaceable, and ephemeral events.
          Regular events are events with a kind between 1000 and 9999, and upon
          receiving them, relays should send them to all clients with matching
          filters and also store them. Replaceable events are events with a kind
          between 10000 and 19999, which upon receiving, the relay should check
          if the event has a newer timestamp than the previous event with the
          same kind, and signed by the same key, then the old event should be
          discarded and replaced with the newer event. Lastly, Ephemeral events
          are events with a kind between 20000 and 29999, upon receiving them,
          the relay should send them to all clients with matching filters and
          they must not store them. Clients are expected to check the
          supported_nips field to see if the relay supports this NIP.
        </p>

        <h2>NIP-18</h2>
        <h3>Reposts</h3>
        <p>
          NIP-18 defines the "repost" feature for nostr events. A repost is a
          type 6 note that is used to signal to followers that another event is
          worth reading. The content of a repost event is empty, but it includes
          a mandatory "e" tag with the id of the note that is being reposted,
          and an optional "p" tag with the pubkey of the event being reposted.
          The e tag also include the relay url as its third entry, this allow
          the clients to fetch the reposted event from the specified relay URL.
          The repost event allows users to easily share and draw attention to
          other users' content, similar to the repost feature on social media
          platforms.
        </p>

        <h2>NIP-19</h2>
        <h3>bech32-Encoded Entities</h3>
        <p>
          NIP-19 describes a standard for encoding keys, ids, and other
          information in bech32 format. This format is intended for
          human-friendly display and input, and not for use within the core
          Nostr protocol. It suggests using different prefixes for different
          types of entities: "npub" for public keys, "nsec" for private keys,
          and "note" for note ids. The proposal also describes a way to share
          identifiers with additional metadata, using a binary-encoded list of
          TLV (type-length-value) structures, and suggests prefixes such as
          "nprofile" for profiles and "nevent" for events. It also clarifies
          that, while bech32 keys can be used in the display and input, they
          should not be used in NIP-01 events, only the hex format is supported
          there.
        </p>

        <h2>NIP-20</h2>
        <h3>Command Results</h3>
        <p>
          NIP-20 proposes a way for clients to know if an event they submit to a
          relay is successfully committed to the database or not. It suggests
          that relays should use a JSON object, called a "command result," to
          provide clients with more information about whether an event was
          accepted or rejected. The command result is in the format of ["OK",
          &lt;event_id&gt;, &lt;true|false&gt;, &lt;message&gt;], where "OK"
          denotes the command result, &lt;event_id&gt; is the event id,
          &lt;true|false&gt; is the acceptance or rejection of the event, and
          &lt;message&gt; is a string that provides additional information on
          why the command succeeded or failed. The message may start with
          "duplicate:" if the event was a duplicate and has already been saved,
          "blocked:" if the pubkey or network address has been blocked,
          "invalid:" if the event is invalid or doesn't meet some specific
          criteria, "pow:" if the event doesn't meet some proof-of-work
          difficulty, "rate-limited:" if the event was rejected due to rate
          limiting techniques, and "error:" if the event failed to save due to a
          server issue.
        </p>

        <h2>NIP-22</h2>
        <h3>Event created_at Limits</h3>
        <p>
          NIP-22 proposes a way for relays to define both upper and lower limits
          within which they will consider an event's created_at timestamp to be
          acceptable. This is to ensure that events with timestamps that are too
          far in the past or future are not stored by the relay. The proposal
          suggests that relays should communicate these limits to clients using
          the NIP-20 command result, indicating that the event was not stored
          due to the timestamp not being within the permitted limits. The
          motivation for this NIP is to create a better user experience by
          reducing the number of events that appear out of order or from
          impossible dates in the distant past or future. It also allows clients
          to be aware of the limits that the relay has set and adjust
          accordingly, but it is important to keep in mind that it could also
          not permit older events to be migrated to new relays.
        </p>

        <h2>NIP-25</h2>
        <h3>Reactions</h3>
        <p>
          A reaction is a kind 7 note in the nostr protocol that allows users to
          react to other notes. This NIP defines the behavior for reactions,
          which includes the content of the reaction and the tags that should be
          included. The content of a reaction can be set to "+" to indicate a
          "like" or "upvote", "-" to indicate a "dislike" or "downvote", or an
          emoji, which can be interpreted as a "like" or "dislike" or displayed
          as an emoji reaction on a post. The reaction event should include "e"
          and "p" tags from the note that the user is reacting to, which allows
          users to be notified of reactions to posts they were mentioned in and
          allows clients to pull all the reactions associated with individual
          posts or all the posts in a thread. The last "e" tag must be the id of
          the note that is being reacted to and the last "p" tag must be the
          pubkey of the event being reacted to. This NIP is optional, so it's up
          to relay operator to choose whether they want to support it or not.
        </p>

        <h2>NIP-26</h2>
        <h3>Delegated Event Signing</h3>
        <p>
          NIP-26, "Delegated Event Signing" introduces a new 'delegation' tag
          which allows events to be signed by other keypairs. It allows users to
          grant authorizations to other keypairs, making it easier for them to
          manage different keys for different clients, while keeping their
          'root' keypairs in cold storage. It also allows relays to abstract
          away the use of 'root' keypairs when interacting with clients.
        </p>

        <h2>NIP-28</h2>
        <h3>Public Chat</h3>
        <p>
          NIP-28, "Public Chat" defines new event kinds for public chat
          channels, channel messages, and basic client-side moderation. It
          reserves five event kinds for immediate use and five event kinds for
          future use. The proposed event kinds include: creating channels (40),
          setting channel metadata (41), creating channel messages (42), hiding
          messages (43), muting users (44) among others. The NIP also suggests
          the usage of NIP-10 for relay recommendations.
        </p>

        <h2>NIP-33</h2>
        <h3>Parameterized Replaceable Events</h3>
        <p>
          NIP-33 provides a way to replace events based on a new "d" tag, it
          defines a new range of event kinds (30000 &lt;= n &lt; 40000) where
          the events can be replaced, it allows replacement of events that have
          the same d tag and kind unlike NIP-16, it discards the old event with
          a newer event that shares the same d tag, it allows to use events from
          the same author with any of the following tags. This can be useful for
          updating information, deleting post, and editing post among others.
        </p>

        <h2>NIP-36</h2>
        <h3>Sensitive Content / Content Warning</h3>
        <p>
          NIP-36 introduces the "content-warning" tag that allows users to
          specify if an event's content should be hidden until the reader
          chooses to view it. The tag can include an optional "reason" field
          that explains why the content is sensitive. This allows users to flag
          content that may be disturbing or offensive, and enables clients to
          implement more robust content moderation features. Clients can use the
          "content-warning" tag to hide content by default and give the user an
          option to view it.
        </p>

        <h2>NIP-40</h2>
        <h3>Expiration Timestamp</h3>
        <p>
          NIP-40 is a proposal for a new event tag called "expiration" which
          allows users to specify a unix timestamp at which the message should
          be considered expired by relays and clients, and should be deleted by
          relays. The tag's value is a required UNIX timestamp in seconds, which
          is interpreted as the time at which the message should be deleted by
          relays. Clients should ignore events that have expired. Relays may not
          delete an expired message immediately on expiration and may persist
          them indefinitely, but they should not send expired events to clients,
          even if they are stored. The suggested use cases of this NIP include
          temporary announcements and limited-time offers and it is important to
          note that the events could be downloaded by third parties as they are
          publicly accessible all the time on the relays.
        </p>
      </div>
    </div>
  );
}

export default Nips;
