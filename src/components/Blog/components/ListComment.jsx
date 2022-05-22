import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { BaseImageUser } from '../../../util/setting/config'
ListComment.propTypes = {
  comment: PropTypes.array,
  replyComment: PropTypes.func
}

function ListComment(props) {
  const { comment, replyComment } = props


  const handleReplyComment = (data) => {
    const section = document.querySelector('#box-comment')
    section.scrollIntoView({ behavior: 'smooth', block: 'end' })
    if (replyComment) replyComment(data)
  }




  function renderList() {
    return comment?.map(function (map1) {
      if (map1.id_comment === 0) {
        return (
          <>
            <li className="media">
              <a className="pull-left" href="#">
                <img
                  className="media-object"
                  src={`${BaseImageUser}${map1.image_user}`}
                  alt=""
                  width={"90px"}
                  height={"100%"}
                />
              </a>
              <div className="media-body">
                <ul className="sinlge-post-meta">
                  <li>
                    <i className="fa fa-user" />
                    {map1.name_user}
                  </li>
                  <li>
                    <i className="fa fa-clock-o" />{" "}
                    {moment(map1.updated_at).format("LT")}
                  </li>
                  <li>
                    <i className="fa fa-calendar" />
                    {moment(map1.updated_at).format("LL")}
                  </li>
                </ul>
                <p>{map1.comment}</p>
                {map1.id_comment === 0 ? (
                  <a
                    className="btn btn-primary"
                    onClick={() => handleReplyComment(map1)}
                  >
                    <i className="fa fa-reply"></i> Replay
                  </a>
                ) : (
                  ""
                )}
              </div>
            </li>
            {comment?.map((map2) => {
              if (map2.id_comment === map1.id) {
                return (
                  <li className="media second-media">
                    <a className="pull-left" href="#">
                      <img
                        className="media-object"
                        src={`${BaseImageUser}${map2.image_user}`}
                        alt=""
                        width={"90px"}
                        height={"100%"}
                      />
                    </a>
                    <div className="media-body">
                      <ul className="sinlge-post-meta">
                        <li>
                          <i className="fa fa-user" />
                          {map2.name_user}
                        </li>
                        <li>
                          <i className="fa fa-clock-o" />{" "}
                          {moment(map2.updated_at).format("LT")}
                        </li>
                        <li>
                          <i className="fa fa-calendar" />
                          {moment(map2.updated_at).format("LL")}
                        </li>
                      </ul>
                      <p>{map2.comment}</p>
                      {map2.id_comment === 0 ? (
                        <a
                          className="btn btn-primary"
                          onClick={() => handleReplyComment(map2)}
                        >
                          <i className="fa fa-reply"></i> Replay
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  </li>
                );
              }
            })}
          </>
        );
      }
    });
  }

  return (
    <div className="response-area">
      <h2>{comment?.length} RESPONSES</h2>
      {renderList()}
    </div>
  )
}

export default ListComment
