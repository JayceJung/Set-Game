export const Oval = ({ color, shading }: { color: string; shading: string }) => {
  const patternId = `oval-stripes-${color.replace('#', '')}`;

  return (
    <svg width="40" height="75" viewBox="0 0 40 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M 0,0 h 10" stroke={color} strokeWidth="4" />
        </pattern>
      </defs>
      <ellipse
        cx="20"
        cy="32"
        rx="15"
        ry="32"
        fill={shading === 'solid' ? color : shading === 'striped' ? `url(#${patternId})` : 'none'}
        stroke={shading === 'open' || shading === 'striped' ? color : 'none'}
        strokeWidth="2"
      />
    </svg>
  );
};
export const Squiggle = ({ color, shading }: { color: string; shading: string }) => {
  const patternId = `squiggle-stripes-${color.replace('#', '')}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="80" viewBox="0 0 515 700">
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="50" height="50">
          <path d="M 0,0 h 50" stroke={color} strokeWidth="30" />
        </pattern>
      </defs>
      <path
        d="M208.5078582763672,180.62826538085938C194.10995229085287,167.9319305419922,185.8638687133789,153.27224731445312,193.5863800048828,139.7905731201172C201.30889129638672,126.30889892578125,228.1413548787435,106.54450225830078,254.84292602539062,99.73822021484375C281.5444971720378,92.93193817138672,324.4764353434245,87.82722727457683,353.7958068847656,98.952880859375C383.11517842610675,110.07853444417317,425.13087972005206,139.0052286783854,430.7591552734375,166.4921417236328C436.38743082682294,193.97905476888022,400.39268493652344,235.99477895100912,387.5654602050781,263.8743591308594C374.7382354736328,291.75393931070965,352.4869079589844,311.78009541829425,353.7958068847656,333.7696228027344C355.1047058105469,355.7591501871745,377.48691813151044,381.67539469401044,395.4188537597656,395.8115234375C413.3507893880208,409.94765218098956,450.3926595052083,406.0209503173828,461.3874206542969,418.5863952636719C472.38218180338544,431.15184020996094,479.84291585286456,459.94765218098956,461.3874206542969,471.2041931152344C442.9319254557292,482.4607340494792,388.08900197347003,492.0156962076823,350.6544494628906,486.1256408691406C313.2198969523112,480.23558553059894,260.3403142293294,457.06804911295575,236.7801055908203,435.8638610839844C213.2198969523112,414.659673055013,208.37696838378906,384.2931823730469,209.29319763183594,358.9005126953125C210.2094268798828,333.5078430175781,230.49737803141275,307.32983144124347,242.27748107910156,283.5078430175781C254.05758412679037,259.6858545939128,285.6020863850911,233.11517842610678,279.97381591796875,215.9685821533203C274.3455454508464,198.82198588053384,222.9057642618815,193.32460021972656,208.5078582763672,180.62826538085938C194.10995229085287,167.9319305419922,185.8638687133789,153.27224731445312,193.5863800048828,139.7905731201172"
        fill={shading === 'solid' ? color : shading === 'striped' ? `url(#${patternId})` : 'none'}
        stroke={color}
        strokeWidth="17"
        transform="scale(1, 1.3) matrix(1.477455443789063,0,0,1.477455443789063,-189.94747722870164,-128.73343173302584)"
      />
    </svg>
  );
};

export const Diamond = ({ color, shading }: { color: string; shading: string }) => {
  const patternId = `diamond-stripes-${color.replace('#', '')}`;

  return (
    <svg width="40" height="75" viewBox="0 0 40 65" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="10" height="10">
          <path d="M 0,0 h 10" stroke={color} strokeWidth="4" />
        </pattern>
      </defs>
      <polygon
        points="20,0 40,35 20,70 0,35"
        fill={shading === 'solid' ? color : shading === 'striped' ? `url(#${patternId})` : 'none'}
        stroke={shading === 'open' || shading === 'striped' ? color : 'none'}
        strokeWidth="2"
      />
    </svg>
  );
};