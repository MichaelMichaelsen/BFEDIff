#!/usr/bin/perl
#
package mu;
use LWP::Simple;
use JSON::Parse ':all';
use JSON;
use strict;

use Exporter;
use vars qw($VERSION @ISA @EXPORT @EXPORT_OK %EXPORT_TAGS);

@ISA    = qw(Exporter MUSamletFastEjendom MUEjerlejlighed MUBPFG);
@EXPORT = qw(MUSamletFastEjendom MUEjerlejlighed MUBPFG);

my $protocol 	= "https://";
my %system 		= (
					"test03" =>
					   { host     => "test03-services.datafordeler.dk",
					     username => "FTXZUJOQVX",
                         password => "P1beS0vs.."
                       },
					"test06" =>
					   { host     => "test06-services.datafordeler.dk",
					     username => "BHOHUXMFHR",
                         password => "Testpw12"
                       }
				  );
my $path 		= "/Matrikel/Matrikel/1/REST";
my $format   	= "?format=json";

#
# set up the url
#
sub makeurl{
  my $testenv   = shift;
  my $metode    = shift;
  my $parameter = shift;
  my $user      = "&username=".$system{$testenv}{username};
  my $pw        = "&password=".$system{$testenv}{password};
  return $protocol.$system{$testenv}{host}.$path.$metode.$format.$user.$pw.$parameter;
}
sub MURest{
   my $testenv  = shift;
   my $metode   = shift;
   my $parameter= shift;

   my $url       = makeurl($testenv,$metode,$parameter);
   my $content   = get($url);
  # printf "%s\n",$url;
   return 0 unless defined $content;
   my $json;
   eval {
     $json      = parse_json($content)
   };
   if ($@) {
      return 0
   }
   #printf "%s\n", JSON->new->pretty->encode($json);
   return $json
}
#
# MUSamletFastEjendom - hent et felt baseret på en id og et feltnavn
#
sub MUSamletFastEjendom{
   my $testenv  = shift;
   my $felt     = shift;
   my $id       = shift;

   my $metode   = "/SamletFastEjendom";
   my $parameter = "&".$felt."=".$id;
   return MURest($testenv,$metode,$parameter);
}
#
# MUEjerlejlighed - hent et felt baseret på en id og et feltnavn
#
sub MUEjerlejlighed{
   my $testenv  = shift;
   my $felt     = shift;
   my $id       = shift;

   my $metode   = "/Ejerlejlighed";
   my $parameter = "&".$felt."=".$id;
   return MURest($testenv,$metode,$parameter);
}
#
# MUBPFG - hent et felt baseret på en id og et feltnavn
#
sub MUBPFG{
   my $testenv  = shift;
   my $felt     = shift;
   my $id       = shift;

   my $metode   = "/BygningPaaFremmedGrund";
   my $parameter = "&".$felt."=".$id;
   return MURest($testenv,$metode,$parameter);
}
1;
