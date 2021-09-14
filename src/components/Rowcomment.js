export default function Rowcomment() {
  return (
    <div className="row space_between">
      <span>Lorem ipsum dolor sit amet</span>
      <div className="row space_between allsize maxedcorebox_x6">
        {
                ['Up', 'Down'].map((e) => <span key={`Comment${e}`} className="btn_u">{e}</span>)
            }
      </div>
    </div>
  );
}
